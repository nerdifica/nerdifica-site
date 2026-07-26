#!/usr/bin/env node
import { appendFileSync } from 'node:fs'

const BASE_URL = process.env.SEO_AUDIT_BASE_URL || 'http://localhost:3000'
const HAS_ADSENSE = Boolean(process.env.NUXT_PUBLIC_ADSENSE_ID)

const results = []

async function fetchText(path) {
  const res = await fetch(`${BASE_URL}${path}`, { headers: { accept: 'text/html' } })
  return { status: res.status, body: await res.text() }
}

async function check(name, essential, fn) {
  try {
    const ok = await fn()
    results.push({ name, essential, ok, error: null })
  } catch (err) {
    results.push({ name, essential, ok: false, error: err.message })
  }
}

async function main() {
  const sitemapUrls = await fetch(`${BASE_URL}/api/__sitemap__/urls`).then((r) => r.json())
  const nicheEntry = sitemapUrls.find((u) => /^\/pt-br\/[^/]+$/.test(u.loc))
  const toolEntry = sitemapUrls.find((u) => /^\/pt-br\/[^/]+\/tool\/[^/]+$/.test(u.loc))

  await check('Home responde 200', true, async () => {
    const { status } = await fetchText('/pt-br')
    return status === 200
  })

  await check('Sitemap index lista as 3 locales', true, async () => {
    const { status, body } = await fetchText('/sitemap_index.xml')
    return status === 200 && (body.match(/<sitemap>/g) || []).length === 3
  })

  await check('Sitemap cobre páginas reais (não só a homepage)', true, async () => {
    const { body } = await fetchText('/__sitemap__/pt-BR.xml')
    return (body.match(/<url>/g) || []).length > 1
  })

  await check('robots.txt referencia o sitemap e permite indexação', true, async () => {
    const { status, body } = await fetchText('/robots.txt')
    return status === 200 && body.includes('Sitemap:') && !/Disallow:\s*\/\s*$/m.test(body)
  })

  // Bônus por enquanto: NUXT_PUBLIC_ADSENSE_ID ainda não tem um publisher ID real
  // (conta AdSense não aprovada ainda). Promover pra essencial quando tiver.
  await check('ads.txt válido', false, async () => {
    const { status, body } = await fetchText('/ads.txt')
    return status === 200 && /^google\.com,\s*pub-/.test(body.trim())
  })

  if (!nicheEntry) {
    throw new Error('Nenhuma página de nicho encontrada em /api/__sitemap__/urls')
  }
  const { body: nicheHtml } = await fetchText(nicheEntry.loc)

  await check('Meta description presente na página de nicho', true, () =>
    /<meta name="description" content="[^"]+"/.test(nicheHtml)
  )

  await check('Canonical tag presente', true, () => /<link rel="canonical"/.test(nicheHtml))

  await check('Hreflang da página bate com os slugs corretos do sitemap', true, () => {
    const matches = [
      ...nicheHtml.matchAll(
        /<link rel="alternate" href="([^"]+)" hreflang="(pt-BR|es-ES|en-US)">/g
      ),
    ]
    if (matches.length < 3) return false
    const pagePathByHreflang = Object.fromEntries(
      matches.map((m) => [m[2], new URL(m[1]).pathname])
    )
    const expectedPathByHreflang = Object.fromEntries(
      (nicheEntry.alternatives || []).map((a) => [a.hreflang, a.href])
    )
    return ['pt-BR', 'es-ES', 'en-US'].every(
      (hreflang) => pagePathByHreflang[hreflang] === expectedPathByHreflang[hreflang]
    )
  })

  // Bônus pelo mesmo motivo do ads.txt acima.
  await check('Script do AdSense presente (quando publisher ID configurado)', false, () => {
    if (!HAS_ADSENSE) return true
    return nicheHtml.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')
  })

  await check('Página de erro customizada em 404', true, async () => {
    const { status, body } = await fetchText('/pt-br/pagina-que-nao-existe-xyz')
    return status === 404 && !body.trim().startsWith('{')
  })

  await check('AdSlot presente na página de nicho', false, () => nicheHtml.includes('data-slot='))

  await check('og:image presente', false, () => /<meta property="og:image"/.test(nicheHtml))

  await check('Schema WebSite (JSON-LD) presente', false, () =>
    /"@type":\s*"WebSite"/.test(nicheHtml)
  )

  if (toolEntry) {
    const { body: toolHtml } = await fetchText(toolEntry.loc)
    await check('FAQPage JSON-LD presente na página de tool', false, () =>
      /"@type":\s*"FAQPage"/.test(toolHtml)
    )
  }

  const total = results.length
  const passed = results.filter((r) => r.ok).length
  const score = Math.round((passed / total) * 1000) / 10
  const essentialFailures = results.filter((r) => r.essential && !r.ok)

  console.log('\n=== Relatório de qualidade SEO ===\n')
  for (const r of results) {
    const mark = r.ok ? '✔' : '✘'
    const tag = r.essential ? '[essencial]' : '[bônus]'
    console.log(`${mark} ${tag} ${r.name}${r.error ? ` — ${r.error}` : ''}`)
  }
  console.log(`\nPontuação: ${score}% (${passed}/${total})`)

  if (process.env.GITHUB_STEP_SUMMARY) {
    const rows = results
      .map(
        (r) =>
          `| ${r.ok ? '✔' : '✘'} | ${r.essential ? 'Essencial' : 'Bônus'} | ${r.name}${r.error ? ` (${r.error})` : ''} |`
      )
      .join('\n')
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `## Auditoria de qualidade SEO\n\n**Pontuação: ${score}% (${passed}/${total})**\n\n` +
        `| | Tipo | Verificação |\n|---|---|---|\n${rows}\n`
    )
  }

  const gatePassed = score >= 90 && essentialFailures.length === 0
  if (!gatePassed) {
    console.error(
      `\nFALHOU: exige pontuação >= 90% (obtido ${score}%) e todos os pontos essenciais passando ` +
        `(${essentialFailures.length} essencial(is) falhando).`
    )
    process.exitCode = 1
    return
  }
  console.log('\nOK: qualidade de SEO aprovada.')
}

main().catch((err) => {
  console.error('Erro ao rodar auditoria de SEO:', err)
  process.exitCode = 1
})