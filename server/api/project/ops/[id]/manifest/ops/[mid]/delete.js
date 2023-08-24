export default defineUserHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')
  const manifestId = getRouterParam(event, 'mid')

  const snapshotManifest = await Manifest.findOne({ _id: manifestId, projectId })

  if (!snapshotManifest) {
    return createError({ statusCode: '404', statusMessage: 'Manifest does not exist' })
  }

  await Manifest.deleteOne({ _id: manifestId })
  return snapshotManifest
})
