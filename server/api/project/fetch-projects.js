export default defineUserHandler(async () => {
  return await Project.find()
})