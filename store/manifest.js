import { defineStore } from 'pinia'
import createManifest from './actions/manifest/createManifest'
import fetchManifest from './actions/manifest/fetchManifest'
import ensureManifest from './actions/manifest/ensureManifest'
import deleteManifest from './actions/manifest/deleteManifest'

export const useManifest = defineStore('manifest-store', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      isReady: false,
      manifest: {}
    }
  },
  getters: {
    getManifest (state) {
      return state.manifest
    }
  },
  actions: {
    createManifest,
    fetchManifest,
    deleteManifest,
    ensureManifest
  }
})