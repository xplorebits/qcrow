export default defineUserHandler(async (event) => {
  const body = await readBody(event)

  if (!(body?.projectId && body?.data && body?.data?.name && body?.data?.selection)) {
    return createError({ statusCode: '400', statusMessage: 'One or more properties are not valid' })
  }

  const snapshotManifest = await Manifest.findOne({ _id: body.projectId })
  console.log(snapshotManifest)

  return true
})
