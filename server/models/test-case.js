import { defineMongooseModel } from '#nuxt/mongoose'

export const TestCase = defineMongooseModel({
  name: 'TestCase',
  schema: {
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
  },
})

