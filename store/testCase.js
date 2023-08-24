import { defineStore } from 'pinia'
import addTestCase from './actions/testCase/addTestCase'
import fetchTestCases from './actions/testCase/fetchTestCases'

export const useTestCase = defineStore('testCase', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      isReady: false,
      testCases: []
    }
  },
  getters: {
    getTestCases (state) {
      return state.testCases
    }
  },
  actions: {
    addTestCase,
    fetchTestCases
  }
})