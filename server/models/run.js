import { defineMongooseModel } from '#nuxt/mongoose'

export const Run = defineMongooseModel({
  name: 'Run',
  schema: {
    projectId: {
      type: String,
      required: true,
    },
    manifestId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true
    },
    results: [
      {
        testCaseId: {
          type: String
        },
        results: [
          {
            testEnv: {
              type: String,
              required: true
            },
            result: {
              type: Boolean,
              required: true
            }
          }
        ]
      }
    ]
  },
})
