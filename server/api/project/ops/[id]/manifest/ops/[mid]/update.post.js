export default defineUserHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')
  const manifestId = getRouterParam(event, 'mid')
  const body = await readBody(event)

  const snapshotProject = await Project.findOne({ _id: projectId })

  if (!snapshotProject) {
    return createError({ statusCode: '404', statusMessage: 'Project does not exist' })
  }

  const snapshotManifest = await Manifest.findOne({ _id: manifestId })

  if (!snapshotManifest) {
    return createError({ statusCode: '404', statusMessage: 'Manifest does not exist' })
  }

  await Manifest.updateOne({ _id: manifestId }, body)
  return await Manifest.findOne({ _id: manifestId })
})
