import { v4 as uuidv4 } from 'uuid'

const getFreshToken = async function () {
  const token = uuidv4()

  if (await Run.findOne({ token })) {
    return await getFreshToken()
  } else {
    return token
  }
}

export default defineUserHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')
  const manifestId = getRouterParam(event, 'mid')

  const token = await getFreshToken()

  await (new Run({
    projectId,
    manifestId,
    token
  })).save()

  return token
})
