export default defineUserHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name) {
    return createError({ statusCode: '400', statusMessage: 'Invalid project name' })
  }

  const nameKey = useNitroApp().getNameKey(body.name)

  if (await Project.findOne({ nameKey })) {
    return createError({ statusCode: '409', statusMessage: 'Project with given name already exists' })
  }

  const lastModified = new Date().toISOString()

  return await (new Project({ nameKey, lastModified, ...body })).save()
})
