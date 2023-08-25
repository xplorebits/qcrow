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
      <template v-slot:body>
        <div class="space-y-2">
          <UTable
            :columns="manifestColumns"
            :rows="manifests"
            :sort="{ column: 'title' }"
          >
            <template #name-data="{ row }">
              <NuxtLink :to="`/project/${projectId}/manifest/${row.id}`">
                <UButton variant="link" icon="i-bi-arrow-right-short" trailing>
                  {{ row.name }}
                </UButton>
              </NuxtLink>
            </template>
            <template #actions-data="{ row }">
              <UDropdown :items="rowActions(row)">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-ellipsis-horizontal-20-solid"
                />
              </UDropdown>
            </template>
          </UTable>

          <UButton
            icon="i-heroicons-plus"
            size="sm"
            color="primary"
            variant="soft"
            label="Create New Manifest"
            @click="() => refCreateManifest.open()"
          />
        </div>
      </template>
    </ProjectPageContainer>

    <modals-create-manifest ref="refCreateManifest" />
  </NuxtLayout>
</template>

<script setup>
import { useProject } from "@/store/project";
import { useManifest } from "@/store/manifest";
import ProjectPageContainer from "@/components/ProjectPageContainer.vue";

const storeProject = useProject();
const storeManifest = useManifest();
const projectId = useRoute().params?.id || "";

const onDeleteManifest = function (manifestId) {
  storeManifest.deleteManifest(projectId, manifestId);
};

const rowActions = (row) => [
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => onDeleteManifest(row.id),
    },
  ],
];

const manifestColumns = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "countTestCases",
    label: "Total Test Cases",
    sortable: true,
  },
  {
    key: "createdBy",
    label: "Created By",
    sortable: true,
    direction: "desc",
  },
  {
    key: "lastModified",
    label: "Last Modified",
    sortable: true,
    direction: "desc",
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },
];

const refCreateManifest = ref(null);
/* const manifests = [
  {
    id: 1,
    name: "Lindsay Walton",
    countTestCases: 0,
    createdBy: "lindsay.walton",
    lastModified: "",
  }, 
];*/

const manifests = computed(() => {
  return (storeManifest.getManifest?.[projectId] || []).map((x) => ({ id: x._id, ...x }));
});

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

onMounted(() => {
  storeManifest.fetchManifest(useRoute().params.id);
});
</script>
