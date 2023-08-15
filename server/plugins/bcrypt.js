import bcrypt from 'bcrypt'

export default defineNitroPlugin((nitroApp) => {
  nitroApp['genPasswordHash'] = function (text, saltRounds) {
    return bcrypt.hash(text, saltRounds)
  }

  nitroApp['verifyPassword'] = function (text, hash) {
    return bcrypt.compare(text, hash)
  }
})
