import { defineMongooseModel } from '#nuxt/mongoose'

export const Manifest = defineMongooseModel({
  name: 'Manifest',
  schema: {
    projectId: {
      type: String,
      required: true
    },
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
    },
    testCases: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true
          },
          expectedResult: {
            type: String,
            required: true
          },
          testSteps: {
            type: String,
            required: true
          }
        }
      ]
    }
  },
})

