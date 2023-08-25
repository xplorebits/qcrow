<template>
  <NuxtLayout name="run">
    <div class="grid grid-cols-12 gap-0 h-full">
      <div class="relative col-span-2 border-r border-zinc-700">
        <div class="absolute top-0 right-0 left-0 bottom-24 overflow-y-auto">
          <UVerticalNavigation :links="testCases">
            <template #default="{ link }">
              <div class="relative text-left w-full">
                <div
                  :class="[
                    activeTestCaseId === link._id
                      ? 'bg-green-900 px-2 py-1 rounded-md text-green-400'
                      : 'px-2 py-1',
                  ]"
                >
                  {{ link.label }}
                </div>
              </div>
            </template>
          </UVerticalNavigation>
        </div>
        <div
          class="absolute right-0 bottom-0 left-0 h-24 bg-yellow-600 hover:bg-yellow-700"
        >
          <div
            class="flex items-center justify-center h-full text-white text-2xl uppercase cursor-pointer select-none"
          >
            Finish
          </div>
        </div>
      </div>
      <div class="col-span-10">
        <run-page-container>
          <template #header>
            <div
              :class="[
                result[activeTestCaseId] === true
                  ? 'bg-green-900'
                  : result[activeTestCaseId] === false
                  ? 'bg-red-900'
                  : 'bg-transparent',
                'h-full flex items-center gap-6 px-8',
              ]"
            >
              <div class="space-y-4">
                <p class="text-4xl">
                  {{ activeTestCase?.title || "-" }}
                </p>
              </div>
              <div class="grow" />
              <UButton
                :ui="{ size: { bigger: 'text-6xl' } }"
                :class="prevTestCaseId ? 'opacity-100' : 'opacity-20'"
                :disabled="!prevTestCaseId"
                icon="i-bi-arrow-left-circle"
                title="Go to previous test case"
                size="bigger"
                color="white"
                variant="link"
                @click="
                  () => {
                    if (prevTestCaseId) {
                      activeTestCaseId = prevTestCaseId;
                    }
                  }
                "
              />
              <UButton
                :ui="{ size: { bigger: 'text-6xl' } }"
                :class="nextTestCaseId ? 'opacity-100' : 'opacity-20'"
                :disabled="!nextTestCaseId"
                icon="i-bi-arrow-right-circle"
                title="Go to next test case"
                size="bigger"
                color="white"
                variant="link"
                @click="
                  () => {
                    if (nextTestCaseId) {
                      activeTestCaseId = nextTestCaseId;
                    }
                  }
                "
              />
            </div>
          </template>
          <template #body>
            <div class="absolute top-0 right-0 left-0 h-24 border-b border-zinc-700">
              <div class="grid grid-cols-12 gap-0 h-full">
                <div class="col-span-8 border-r border-zinc-700 overflow-y-auto">
                  <div class="p-3">
                    {{ activeTestCase?.description || "-" }}
                  </div>
                </div>
                <div class="col-span-4 h-full relative">
                  <div class="grid grid-cols-12 gap-0 h-full text-2xl">
                    <div
                      :class="[
                        result[activeTestCaseId] === true ? 'opacity-100' : 'opacity-20',
                        'col-span-6 border-r border-zinc-800 cursor-pointer bg-green-900',
                      ]"
                      title="Pass the test"
                      @click="() => (result[activeTestCaseId] = true)"
                    >
                      <div class="flex items-center justify-center h-full gap-3">
                        <UIcon
                          :name="
                            result[activeTestCaseId] === true
                              ? 'i-mdi-checkbox-blank-circle'
                              : 'i-mdi-checkbox-blank-circle-outline'
                          "
                        />
                        PASS
                      </div>
                    </div>
                    <div
                      :class="[
                        result[activeTestCaseId] === false ? 'opacity-100' : 'opacity-20',
                        'col-span-6 cursor-pointer bg-red-900',
                      ]"
                      title="Fail the test"
                      @click="() => (result[activeTestCaseId] = false)"
                    >
                      <div class="flex items-center justify-center h-full gap-3">
                        <UIcon
                          :name="
                            result[activeTestCaseId] === false
                              ? 'i-mdi-checkbox-blank-circle'
                              : 'i-mdi-checkbox-blank-circle-outline'
                          "
                        />
                        FAIL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute top-24 right-0 bottom-0 left-0 left-0">
              <div class="grid grid-cols-12 gap-0 h-full">
                <div class="col-span-8 border-r border-zinc-700 overflow-y-auto p-3">
                  <div
                    v-if="$md"
                    class="no-tailwind"
                    v-html="$md.render(activeTestCase?.expectedResult || '')"
                  />
                </div>
                <div class="col-span-4 overflow-y-auto p-3">
                  <div
                    v-if="$md"
                    class="no-tailwind"
                    v-html="$md.render(activeTestCase?.testSteps || '')"
                  />
                </div>
              </div>
            </div>
          </template>
        </run-page-container>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  auth: false,
});

const activeTestCaseId = ref("");
const token = useRoute().params.runId;
const manifest = ref({});

const onClickTestCase = function (id) {
  activeTestCaseId.value = id;
};

const activeTestCase = computed(() => {
  return unref(testCases).find((x) => x._id === unref(activeTestCaseId));
});

const testCases = computed(() => {
  return (manifest.value?.testCases || []).map((x) => ({
    ...x,
    label: x.title,
    click: () => onClickTestCase(x._id),
  }));
});

const result = ref({});

const prevTestCaseId = computed(() => {
  const ti = unref(testCases).findIndex((x) => x._id === unref(activeTestCaseId));

  return (unref(testCases)?.[ti - 1] || {})?._id || "";
});

const nextTestCaseId = computed(() => {
  const ti = unref(testCases).findIndex((x) => x._id === unref(activeTestCaseId));

  return (unref(testCases)?.[ti + 1] || {})?._id || "";
});

const { $md } = useNuxtApp();

onMounted(() => {
  $fetch("/api/run/get-manifest", {
    method: "POST",
    body: {
      token,
    },
  })
    .then((res) => {
      manifest.value = res;

      if (res?.testCases?.[0]) {
        activeTestCaseId.value = res.testCases[0]._id;
      }
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
    })
    .finally(() => {});
});
</script>
