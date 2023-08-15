import mongoose from 'nuxt-mongoose'

export default defineUserHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  await Project.deleteOne({ _id: id })
  return true 
})