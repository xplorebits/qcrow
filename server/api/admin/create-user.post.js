import { v4 as uuidv4 } from 'uuid'

export default defineAdminHandler(async (event) => {
  try {
    const { options, data } = await readBody(event)

    if (!data?.username) {
      return createError({ statusCode: '400', statusMessage: 'Bad Request' })
    }
    const { password, username, ...updates } = data || {}

    const duplicateUser = await User.findOne({ username })

    let newPassword = options.genPassword === true ? uuidv4() : password || undefined

    if (!newPassword) {
      password = uuidv4()
    }
    let hash = await useNitroApp().genPasswordHash(newPassword, 10)
  
    if (duplicateUser) {
      await User.updateOne({ hash, ...(updates || {}) })
    } else {
      await (new User({ username, hash, ...(updates || {}) })).save()
    }

    return newPassword
  } catch (error) {
    console.error(error)
    return createError({ statusCode: 500, statusMessage: 'Internal Error' })
  }
})