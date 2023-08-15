export default defineNitroPlugin((nitroApp) => {
  nitroApp['getNameKey'] = str => str.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-');
})
