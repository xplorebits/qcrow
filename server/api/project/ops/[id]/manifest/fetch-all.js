export default defineUserHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')
  return await Manifest.find({ projectId }) || []
})
