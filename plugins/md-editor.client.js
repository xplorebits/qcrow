import { MdEditor, MdPreview, MdCatalog } from 'md-editor-v3';
import md from 'markdown-it';
import 'md-editor-v3/lib/style.css';
import 'md-editor-v3/lib/preview.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('MdEditor', MdEditor)
  nuxtApp.vueApp.component('MdPreview', MdPreview)
  nuxtApp.vueApp.component('MdCatalog', MdCatalog)

  return {
    provide: {
      md: new md()
    }
  }
})
