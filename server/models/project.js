import { defineMongooseModel } from '#nuxt/mongoose'

export const Project = defineMongooseModel({
  name: 'Project',
  schema: {
    name: {
      type: String,
      required: false,
    },
    countManifest: {
      type: Number,
      required: false
    },
    createdBy: {
      type: String,
      required: false
    },
    nameKey: {
      type: String,
      required: true
    }
  },
})

