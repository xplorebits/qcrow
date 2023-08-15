<template>
  <NuxtLayout name="app">
    <ProjectPageContainer>
      <template v-slot:header>
        {{ project.name }}
      </template>
      <template v-slot:body> hello </template>
    </ProjectPageContainer>
  </NuxtLayout>
</template>

<script setup>
import { useProject } from "@/store/project";
import ProjectPageContainer from "@/components/ProjectPageContainer.vue";

const storeProject = useProject();
const projectId = useRoute().params?.id || "";

const project = computed(() => {
  return storeProject.getProjects.find((x) => x._id === projectId) || {};
});
</script>
