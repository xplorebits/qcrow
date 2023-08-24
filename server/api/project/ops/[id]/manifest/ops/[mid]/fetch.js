export default defineUserHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')
  const manifestId = getRouterParam(event, 'mid')
  return await Manifest.find({ _id: manifestId, projectId })
})