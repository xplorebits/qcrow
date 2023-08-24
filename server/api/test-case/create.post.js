export default defineUserHandler(async (event) => {
  const body = await readBody(event)
  return await (new TestCase(body)).save()
})
