<template>
  <div class="h-screen overflow-hidden grid grid-cols-12 gap-0">
    <div class="hidden md:block bg-zinc-900 col-span-2 py-2 overflow-y-auto">
      <UContainer>
        <div class="space-y-3">
          <logo />

          <UInput
            v-model="inputSearch"
            :disabled="!storeProject.isReady"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Search Projects"
          />

          <div v-if="inputSearch" class="z-10 space-y-2 sticky top-0 bg-zinc-900">
            <div
              class="flex items-center gap-1 h-full border pl-2 rounded-md border-yellow-300"
            >
              <p class="grow text-sm text-yellow-500">
                Results {{ searchProjects.length }}
              </p>
              <UButton
                icon="i-heroicons-x-mark"
                size="sm"
                color="yellow"
                variant="ghost"
                trailing
                @click="() => (inputSearch = '')"
              />
            </div>
          </div>

          <UVerticalNavigation
            v-if="storeProject.isReady && inputSearch"
            :links="searchProjects"
            size="lg"
            class="z-5"
          />
          <UVerticalNavigation
            v-else-if="storeProject.isReady"
            :links="projects"
            :ui="{
              active:
                'text-green-800 dark:text-white before:bg-green-700 dark:before:bg-green-800',
            }"
            size="lg"
            class="z-5"
          />
          <UVerticalNavigation
            v-else
            :links="
              Array.from({ length: 20 }, () => ({ label: 'Test', click: () => {} }))
            "
            disabled
            size="lg"
            class="z-5"
          >
            <template #default>
              <div class="relative text-left w-full">
                <div class="h-2 mb-2">
                  <USkeleton class="h-4" />
                </div>
              </div>
            </template>
          </UVerticalNavigation>

          <UButton
            v-if="storeProject.isReady && !inputSearch"
            icon="i-heroicons-plus"
            color="primary"
            variant="outline"
            block
            label="New Project"
            class="sticky bottom-0 bg-zinc-900"
            @click="() => refCreateProject.open()"
          />
        </div>
      </UContainer>
    </div>
    <div class="col-span-12 md:col-span-10" @loading="onLoading">
      <slot />
    </div>

    <modals-create-project ref="refCreateProject" />
  </div>
</template>

<script setup>
import { useProject } from "@/store/project";
const storeProject = useProject();

const inputSearch = ref("");
const selectionProject = ref("");
const refCreateProject = ref(null);

const projects = computed(() => {
  return (storeProject.getProjects || []).map((x) => ({
    label: x.name,
    to: `/project/${x._id}`,
  }));
});

watch(
  () => storeProject.isReady,
  (value) => {
    if (value) {
      const defaultProject = projects.value?.[0] || undefined;
      if (defaultProject) {
        useRouter().replace({ path: defaultProject.to });
      }
    }
  }
);

const searchProjects = computed(() => {
  return unref(projects).filter((x) =>
    (x.label || "").toLowerCase().includes(unref(inputSearch).toLowerCase())
  );
});

const onLoading = function () {
  console.log("loading");
};

const otherMenu = [
  {
    label: "Profile",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/739984?v=4",
    },
    badge: 100,
  },
];

onMounted(() => {
  if (!storeProject.isReady) {
    storeProject.fetchProjects();
  }
});
</script>
