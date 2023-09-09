import { defineStore } from 'pinia'
import createManifest from './actions/manifest/createManifest'
import fetchManifest from './actions/manifest/fetchManifest'
import deleteManifest from './actions/manifest/deleteManifest'
import updateManifest from './actions/manifest/updateManifest'
import ensureManifest from './actions/manifest/ensureManifest'

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
    updateManifest,
    ensureManifest
  }
})