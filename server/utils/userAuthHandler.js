import { getServerSession } from '#auth'

export const defineUserHandler = (handler) => defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    
    if (!session) {
      return createError({ statusCode: 403, statusMessage: 'Unauthorized' })
    }

    return await handler(event)
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: 'Internal Error'})
  }
})
