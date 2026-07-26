export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const publisherId = config.public.adsensePublisherId.replace(/^ca-/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`
})