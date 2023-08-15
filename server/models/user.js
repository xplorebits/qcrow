import { defineMongooseModel } from '#nuxt/mongoose'

export const User = defineMongooseModel({
  name: 'User',
  schema: {
    email: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true
    },
    hash: {
      type: String,
      required: true
    }
  },
})

