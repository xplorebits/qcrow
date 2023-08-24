export default defineUserHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!(projectId && body?.name && body?.selection)) {
    return createError({ statusCode: '400', statusMessage: 'One or more properties are not valid' })
  }

  const snapshotProject = await Project.findOne({ _id: projectId })

  if (!snapshotProject) {
    return createError({ statusCode: '404', statusMessage: 'Project does not exist' })
  }

  const nameKey = useNitroApp().getNameKey(body.name)
  if (await Manifest.findOne({ nameKey, projectId })) {
    return createError({ statusCode: '409', statusMessage: 'Manifest with given name already exists' })
  }

  return await (new Manifest({
    name: body.name,
    countTestCases: body.selection.length,
    createdBy: '',
    testCases: body.selection,
    nameKey,
    projectId
  })).save()
})
