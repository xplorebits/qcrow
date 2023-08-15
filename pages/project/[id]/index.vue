<template>
  <NuxtLayout name="app">
    <ProjectPageContainer>
      <template v-slot:header>
        {{ project.name }}

        <div class="grow" />
        <UDropdown :items="menuProject" :popper="{ placement: 'bottom-start' }">
          <UButton
            color="gray"
            label="Options"
            variant="ghost"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
        </UDropdown>
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

const onClickDeleteProject = function () {
  if (confirm("You are about to delete the project. Please click OK to proceed.")) {
    storeProject.deleteProject(projectId).finally(() => {
      useRouter().repalce({ path: "/" });
    });
  }
};

const menuProject = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Download",
      icon: "i-heroicons-arrow-down-tray",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: onClickDeleteProject,
    },
  ],
];
</script>
