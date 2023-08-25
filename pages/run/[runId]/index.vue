<template>
  <NuxtLayout name="run">
    <run-page-container>
      <template #header>
        <div
          :class="[
            result === 'PASS'
              ? 'bg-green-900'
              : result === 'FAIL'
              ? 'bg-red-900'
              : 'bg-transparent',
            'h-full flex items-center gap-6 px-8',
          ]"
        >
          <div class="space-y-4">
            <p class="text-4xl">Auth Success Test</p>
          </div>
          <div class="grow" />
          <UButton
            :ui="{ size: { bigger: 'text-6xl' } }"
            icon="i-bi-arrow-left-circle"
            title="Go to previous test case"
            size="bigger"
            color="white"
            variant="link"
          />
          <UButton
            :ui="{ size: { bigger: 'text-6xl' } }"
            icon="i-bi-arrow-right-circle"
            title="Go to next test case"
            size="bigger"
            color="white"
            variant="link"
          />
        </div>
      </template>
      <template #body>
        <div class="absolute top-0 right-0 left-0 h-24 border-b border-zinc-700">
          <div class="grid grid-cols-12 gap-0 h-full">
            <div class="col-span-8 border-r border-zinc-700 overflow-y-auto">
              <div class="p-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et
              </div>
            </div>
            <div class="col-span-4 h-full relative">
              <div class="grid grid-cols-12 gap-0 h-full text-2xl">
                <div
                  :class="[
                    result === 'PASS' ? 'opacity-100' : 'opacity-20',
                    'col-span-6 border-r border-zinc-800 cursor-pointer bg-green-900',
                  ]"
                  title="Pass the test"
                  @click="() => (result = 'PASS')"
                >
                  <div class="flex items-center justify-center h-full gap-3">
                    <UIcon
                      :name="
                        result === 'PASS'
                          ? 'i-mdi-checkbox-blank-circle'
                          : 'i-mdi-checkbox-blank-circle-outline'
                      "
                    />
                    PASS
                  </div>
                </div>
                <div
                  :class="[
                    result === 'FAIL' ? 'opacity-100' : 'opacity-20',
                    'col-span-6 cursor-pointer bg-red-900',
                  ]"
                  title="Fail the test"
                  @click="() => (result = 'FAIL')"
                >
                  <div class="flex items-center justify-center h-full gap-3">
                    <UIcon
                      :name="
                        result === 'FAIL'
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
              <div v-if="$md" class="no-tailwind" v-html="$md.render('')" />
            </div>
            <div class="col-span-4 overflow-y-auto p-3">
              <div v-if="$md" class="no-tailwind" v-html="$md.render('')" />
            </div>
          </div>
        </div>
      </template>
    </run-page-container>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  auth: false,
});

const { $md } = useNuxtApp();
const result = ref("");
</script>
