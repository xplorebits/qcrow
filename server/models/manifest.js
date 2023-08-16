import { defineMongooseModel } from '#nuxt/mongoose'

export const Manifest = defineMongooseModel({
  name: 'Manifest',
  schema: {
    name: {
      type: String,
      required: false,
    },
    countTestCases: {
      type: Number,
      required: false
    },
    createdBy: {
      type: String,
      required: false
    },
    lastModified: {
      type: String,
      required: false
    },
    nameKey: {
      type: String,
      required: true
    }
  },
})

