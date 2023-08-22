<template>
  <div class="grid grid-cols-12 gap-0">
    <div class="relative col-span-8 h-[50vh] overflow-y-auto select-none pr-3">
      <grid-layout
        v-model:layout="layout"
        :col-num="1"
        :row-height="12"
        :is-draggable="true"
        :is-resizable="false"
        :vertical-compact="true"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :h="item.h"
          :w="item.w"
          :i="item.i"
          :key="item.i"
          class="relative rounded-md w-full h-full"
          drag-allow-from=".vue-draggable-handle"
          drag-ignore-from=".no-drag"
        >
          <div
            class="flex items-center gap-3 h-full ring-1 ring-gray-200 dark:ring-gray-800 rounded-md px-3"
          >
            <UButton
              icon="i-icon-park-outline-drag"
              size="sm"
              color="primary"
              square
              variant="soft"
              class="vue-draggable-handle cursor-move"
            />

            <div class="grow flex items-center gap-3 no-drag">
              {{ item.data.title }}
            </div>
          </div>
        </grid-item>
      </grid-layout>

      <div v-if="!layout.length" class="absolute top-0 right-0 bottom-0 left-0">
        <div class="flex items-center justify-center h-full text-zinc-500">
          Select a test case to get started.
        </div>
      </div>
    </div>
    <div class="relative col-span-4 border-l border-gray-800">
      <div class="absolute top-0 right-0 left-0 h-12 pl-3 pr-1">
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="lg"
          color="white"
          placeholder="Search Test Cases"
          class="sticky top-0"
          :trailing="false"
        />
      </div>
      <div
        class="absolute top-12 right-0 bottom-0 left-0 overflow-y-auto pl-3 pr-1 py-2 space-y-2"
      >
        <div
          v-for="item in testCases"
          :key="`edit-manifest-selectable-test-case-${item.id}`"
          :class="[
            selection.findIndex((x) => x.id === item.id) > -1
              ? 'bg-primary-900'
              : 'bg-transparent',
            'flex items-center gap-3 h-12 ring-1 ring-gray-200 dark:ring-gray-800 rounded-md px-3',
          ]"
        >
          <UCheckbox
            :checked="selection.findIndex((x) => x.id === 'test') > -1"
            :name="item.id"
            :label="item.title"
            @change="(e) => emits('select', { result: e.target.checked, data: item })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["select"]);
const props = defineProps({
  selection: {
    type: Object,
    default: () => {
      return [];
    },
  },
  testCases: {
    type: Object,
    default: () => {
      return [];
    },
  },
});

const layout = ref([
  // { x: 0, y: 0, w: 1, h: 3, i: "0" },
]);

const syncLayoutY = function () {
  for (let index = 0; index < layout.value.length; index++) {
    layout.value[index].y = index * 3;
  }
};

watch(
  () => props.selection,
  (value) => {
    unref(layout).forEach((item, index) => {
      if (!value.some((x) => x.id === item.data.id)) {
        layout.value.splice(index, 1);
      }
    });

    value.forEach((item) => {
      if (!unref(layout).some((x) => x.data.id === item.id)) {
        layout.value.push({
          x: 0,
          y: layout.value.length * 3,
          w: 1,
          h: 3,
          i: item.id,
          data: item,
        });
      }
    });

    syncLayoutY();
  },
  { deep: true }
);
</script>
