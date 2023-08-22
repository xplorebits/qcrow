import VueGridLayout from "vue3-grid-layout";

export default defineNuxtPlugin((app) => {
  app.vueApp.component("GridLayout", VueGridLayout.GridLayout);
  app.vueApp.component("GridItem", VueGridLayout.GridItem);
});
