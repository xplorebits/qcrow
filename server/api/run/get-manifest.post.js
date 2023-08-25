export default defineEventHandler(async (event) => {
  try {
    const { token } = await readBody(event)

    if (!token) {
      return createError({ statusCode: 403, statusMessage: 'Unauthorized' })
    }

    const snapshotToken = await Run.findOne({ token })

    if (!snapshotToken) {
      return createError({ statusCode: 404, statusMessage: 'Run not found' })
    }

    const { projectId, manifestId } = snapshotToken
    const snapshotManifest = await Manifest.findOne({ projectId, _id: manifestId })

    console.log(snapshotManifest)

    if (!snapshotManifest) {
      return createError({ statusCode: 404, statusMessage: 'Project or Manifest not found' })
    }

    return snapshotManifest
  } catch (error) {
    console.error(error)
    return createError({ statusCode: 500, statusMessage: 'Internal Error' })
  }
})