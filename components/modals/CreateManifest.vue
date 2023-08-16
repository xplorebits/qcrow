<template>
  <UModal v-model="isOpen" :prevent-close="isSubmitting" :ui="{ width: 'sm:max-w-3xl' }">
    <UCard>
      <template #header> Create Manifest </template>

      <div class="grid grid-cols-12 gap-0 h-[10vh]">
        <div class="col-span-8"></div>
        <div class="col-span-4 border-l border-gray-800"></div>
      </div>

      <template #footer>
        <div class="flex items-center gap-3">
          <div class="grow" />
          <UButton :disabled="isSubmitting" color="white" @click="() => (isOpen = false)">
            Close
          </UButton>
          <UButton :disabled="isSubmitting" :loading="isSubmitting" @click="onSubmit">
            Create
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useProject } from "@/store/project";

const isRetry = ref(false);
const isOpen = ref(false);
const storeProejct = useProject();

const { meta, handleSubmit, defineInputBinds, resetForm, isSubmitting } = useForm({
  validationSchema: {
    name: yup.string().required(),
  },
  initialValues: {
    name: "",
  },
});

watch(isOpen, (value) => {
  if (!value) {
    resetForm();
    isRetry.value = false;
  }
});

const name = defineInputBinds("name");

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

    storeProejct
      .addProject(values)
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
