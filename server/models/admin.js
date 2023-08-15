import { defineMongooseModel } from '#nuxt/mongoose'

export const Admin = defineMongooseModel({
  name: 'Admin',
  schema: {
    apiKey: {
      type: String,
      required: true
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

