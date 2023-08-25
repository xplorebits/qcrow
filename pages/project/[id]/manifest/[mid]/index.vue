<template>
  <NuxtLayout name="app">
    <ProjectPageContainer>
      <template v-slot:header>
        <UButton icon="i-bi-arrow-left-circle" variant="ghost" @click="goBack" />
        <div class="inline-flex items-center gap-0">
          <div
            v-for="(item, idx) in navTree"
            :key="`id-${projectId}-mid-${manifestId}-breadcrumb-${idx}`"
          >
            <UButton variant="link" @click="() => onClickNavTreeItem(item)">
              {{ item.name }}
            </UButton>
            <span v-if="idx < 1">/</span>
          </div>
        </div>

        <div class="grow" />
        <UButton icon="i-bi-play-circle" size="xs" variant="solid" @click="onClickRun">
          Run
        </UButton>
        <UDropdown
          :items="pageActions"
          :ui="{ item: { disabled: 'cursor-text select-text' } }"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton variant="ghost" icon="i-bi-three-dots-vertical" />

          <template #account="{ item }">
            <div class="text-left">
              <p>Signed in as</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>

          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </template>
        </UDropdown>
      </template>
      <template v-slot:body>
        <UAccordion :items="[{ label: 'Overview', defaultOpen: true }]" variant="soft">
          <template #item="{ item }">
            <UCard>
              <div class="grid grid-cols-12 gap-3 text-sm">
                <div class="col-span-6 space-y-2">
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-3">
                      <span class="text-zinc-600">Manifest Name:</span>
                    </div>
                    <div class="col-span-9">
                      <span class="text-zinc-200">{{ manifest.name }}</span>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-3">
                      <span class="text-zinc-600">Manifest ID:</span>
                    </div>
                    <div class="col-span-9">
                      <span class="text-zinc-200">{{ manifest._id }}</span>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-3">
                      <span class="text-zinc-600">Project Name:</span>
                    </div>
                    <div class="col-span-9">
                      <span class="text-zinc-200">{{ project.name }}</span>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-3">
                      <span class="text-zinc-600">Project ID:</span>
                    </div>
                    <div class="col-span-9">
                      <span class="text-zinc-200">{{ project._id }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-span-6 space-y-2">
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-3">
                      <span class="text-zinc-600">Total Test Cases:</span>
                    </div>
                    <div class="col-span-9">
                      <span class="text-zinc-200">{{ manifest.countTestCases }}</span>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-3">
                      <span class="text-zinc-600">Created By:</span>
                    </div>
                    <div class="col-span-9">
                      <span class="text-zinc-200">{{ manifest.createdBy || "-" }}</span>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-3">
                      <span class="text-zinc-600">Last Modified:</span>
                    </div>
                    <div class="col-span-9">
                      <span class="text-zinc-200">{{
                        manifest.lastModified || "-"
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </template>
        </UAccordion>

        <UTable
          :columns="manifestColumns"
          :rows="manifest.testCases"
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
      </template>
    </ProjectPageContainer>
  </NuxtLayout>
</template>

<script setup>
import { useProject } from "@/store/project";
import { useManifest } from "@/store/manifest";
import { useTestCase } from "@/store/testCase";

const projectId = useRoute().params.id;
const manifestId = useRoute().params.mid;

const storeProject = useProject();
const storeManifest = useManifest();
const storeTestCase = useTestCase();

const project = computed(() => {
  return storeProject.getProjects.find((x) => x._id === projectId) || {};
});

const manifest = computed(() => {
  return (
    (storeManifest.getManifest?.[projectId] || []).find((x) => x._id === manifestId) || {}
  );
});

const pageActions = [
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
    },
  ],
];

const rowActions = (row) => [
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {},
    },
  ],
];

const manifestColumns = [
  {
    key: "title",
    label: "Title",
    sortable: false,
  },
  {
    key: "description",
    label: "Total Test Cases",
    sortable: false,
  },
  {
    key: "testSteps",
    label: "Test Steps",
    sortable: false,
    direction: "desc",
  },
  {
    key: "expectedResult",
    label: "Expected Result",
    sortable: false,
    direction: "desc",
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },
];

const navTree = [
  { ...project.value, to: `/project/${projectId}` },
  { ...manifest.value, to: `/project/${projectId}/manifest/${manifestId}` },
];

const goBack = function () {
  return useRouter().push({ path: `/project/${projectId}` });
};

const onClickNavTreeItem = function (item) {
  return useRouter().push({ path: item.to });
};

const onClickRun = function () {
  const url = useRouter().resolve({ path: "/run/sdfasdf-safasdf-342ksdfaf-asdfasdf" });
  window.open(url.fullPath, "_blank");
};
</script>
