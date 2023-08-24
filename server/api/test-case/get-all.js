export default defineUserHandler(async () => {
  return await TestCase.find({})
})
