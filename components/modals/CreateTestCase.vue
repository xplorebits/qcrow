<template>
  <UModal v-model="isOpen" :prevent-close="isSubmitting" :ui="{ width: 'sm:max-w-4xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3 h-full">
          New Test Case: {{ values.title }}
        </div>
      </template>

      <form @submit.prevent="onSubmit" class="space-y-3">
        <UInput
          v-bind="title"
          name="title"
          size="lg"
          variant="outline"
          placeholder="Title"
        />
        <UInput
          v-bind="description"
          size="lg"
          variant="outline"
          placeholder="Description"
        />

        <div class="grid grid-cols-12 gap-3">
          <div class="col-span-6 space-y-2">
            <p class="text-sm text-zinc-500">Expected Result</p>
            <UTabs :items="[{ label: 'Write' }, { label: 'Preview' }]">
              <template #item="{ item }">
                <div class="h-48">
                  <MdEditor
                    v-if="item.label === 'Write'"
                    theme="dark"
                    class="!h-full"
                    language="en-US"
                    :preview="false"
                    v-model="editableFields.expectedResult"
                  />
                  <div
                    v-else
                    class="h-full overflow-auto p-2 border border-zinc-700 rounded-sm"
                  >
                    <div
                      class="no-tailwind"
                      v-html="$md.render(editableFields.expectedResult || '')"
                    />
                  </div>
                </div>
              </template>
            </UTabs>
          </div>

          <div class="col-span-6 space-y-2">
            <p class="text-sm text-zinc-500">Test Steps</p>
            <UTabs :items="[{ label: 'Write' }, { label: 'Preview' }]">
              <template #item="{ item }">
                <div class="h-48 overflow-y-auto">
                  <MdEditor
                    v-if="item.label === 'Write'"
                    theme="dark"
                    class="!h-full"
                    language="en-US"
                    :preview="false"
                    v-model="editableFields.testSteps"
                  />
                  <div
                    v-else
                    class="h-full overflow-auto p-2 border border-zinc-700 rounded-sm"
                  >
                    <div
                      class="no-tailwind"
                      v-html="$md.render(editableFields.testSteps || '')"
                    />
                  </div>
                </div>
              </template>
            </UTabs>
          </div>
        </div>
      </form>

      <template #footer>
        <div class="flex items-center gap-3">
          <div class="grow" />
          <UButton :disabled="isSubmitting" color="white" @click="close"> Close </UButton>
          <UButton :disabled="isSubmitting" :loading="isSubmitting" @click="onSubmit">
            Create
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
import { MdEditor } from "md-editor-v3";
import { useForm } from "vee-validate";
import { useTestCase } from "@/store/testCase";
import * as yup from "yup";

const { $md } = useNuxtApp();

const isRetry = ref(false);
const isOpen = ref(false);

const storeTestCase = useTestCase();

const {
  values,
  handleSubmit,
  defineInputBinds,
  resetForm,
  isSubmitting,
  setFieldValue,
} = useForm({
  validationSchema: {
    title: yup.string().required(),
    description: yup.string().required(),
    expectedResult: yup.string().required(),
    testSteps: yup.string().required(),
  },
  initialValues: {
    title: "",
    description: "",
    expectedResult: "",
    testSteps: "",
  },
});

const editableFields = ref({
  expectedResult: "",
  testSteps: "",
});

watch(isOpen, (value) => {
  if (!value) {
    resetForm();
    isRetry.value = false;
  }
});

watch(
  editableFields,
  (value) => {
    setFieldValue("expectedResult", value.expectedResult);
    setFieldValue("testSteps", value.testSteps);
  },
  { deep: true }
);

const title = defineInputBinds("title");
const description = defineInputBinds("description");

const open = function () {
  isOpen.value = true;
};

const close = function () {
  isOpen.value = false;
};

const onSubmit = handleSubmit((values) => {
  return new Promise((resolve) => {
    if (!unref(isRetry)) {
      isRetry.value = true;
    }

    storeTestCase
      .addTestCase(values)
      .then(() => {
        close();
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(resolve);
  });
});

defineExpose({ open, close });
</script>
