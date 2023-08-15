<template>
  <div class="h-screen overflow-hidden grid grid-cols-12 gap-0">
    <div class="hidden md:block bg-zinc-900 col-span-2 py-2 overflow-y-auto">
      <UContainer>
        <div class="space-y-3">
          <logo />

          <UInput
            :disabled="!storeProject.isReady"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Search Projects"
            class="sticky top-0"
          />

          <div class="z-10 space-y-2 sticky top-0 p-2 bg-zinc-900">
            <p class="text-xs text-left">Results 23</p>
            <UButton
              class="mt-1"
              size="xs"
              variant="outline"
              color="primary"
              label="Clear Search"
              block
            />
          </div>

          <UVerticalNavigation
            v-if="storeProject.isReady"
            size="lg"
            :links="links"
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
            v-if="storeProject.isReady"
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

const refCreateProject = ref(null);

const links = computed(() => {
  return (storeProject.getProjects || []).map((x) => ({
    label: x.name,
    to: `/project/${x._id}`,
  }));
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
