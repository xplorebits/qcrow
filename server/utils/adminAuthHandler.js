export const defineAdminHandler = (handler) => defineEventHandler(async (event) => {
  try {
    const apiKey = event.node.req.headers['api-key'] || ''

    if (!await Admin.findOne({ apiKey })) {
      return createError({ statusCode: 403, statusMessage: 'Unauthorized' })
    }

    return await handler(event)
  } catch (error) {
    console.error('auth::utils', error)
    return createError({ statusCode: 500, statusMessage: 'Internal Error'})
  }
})
