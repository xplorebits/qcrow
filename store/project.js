import { defineStore } from 'pinia'
import addProject from './actions/project/addProject'
import fetchProjects from './actions/project/fetchProjects'

export const useProject = defineStore('projects', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      isReady: false,
      projects: []
    }
  },
  getters: {
    getProjects (state) {
      return state.projects
    }
  },
  actions: {
    addProject,
    fetchProjects
  }
})