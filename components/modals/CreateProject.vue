<template>
  <UModal v-model="isOpen" :prevent-close="isSubmitting">
    <UCard>
      <template #header> Create Project </template>

      <form @submit.prevent="onSubmit" class="space-y-3">
        <UAlert
          v-if="isRetry && !meta.valid"
          icon="i-heroicons-exclamation-triangle"
          title="Please check the details and try again!"
          color="red"
          variant="soft"
        />
        <UInput
          v-bind="name"
          :disabled="isSubmitting"
          name="name"
          type="text"
          size="lg"
          placeholder="Name of the new project"
        />
      </form>

      <template #footer>
        <div class="flex items-center gap-3">
          <div class="grow" />
          <UButton :disabled="isSubmitting" color="white" @click="() => (isOpen = false)"
            >Close</UButton
          >
          <UButton :disabled="isSubmitting" :loading="isSubmitting" @click="onSubmit"
            >Create</UButton
          >
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
