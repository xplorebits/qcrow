<template>
  <UModal v-model="isOpen" :prevent-close="isSubmitting" :ui="{ width: 'sm:max-w-5xl' }">
    <UCard>
      <template #header> Create Manifest </template>

      <manifest-edit-manifest
        :selection="selection"
        :test-cases="testCases"
        @select="onSelectTestCase"
      />

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

const selection = ref([]);

const testCases = ref([
  { id: "auth-login-success", title: "Successfull Login" },
  { id: "auth-login-success-2", title: "Unsuccessfull Login" },
  { id: "auth-login-success-3", title: "Successfull Signup" },
  { id: "auth-login-success-4", title: "Unsuccessfull Signup" },
  { id: "auth-login-success-5", title: "Successfull Reset Password" },
  { id: "auth-login-success-6", title: "Unsuccessfull Reset Password" },
]);

const open = function () {
  isOpen.value = true;
};

const close = function () {
  isOpen.value = false;
};

const onSelectTestCase = function (res) {
  const ti = unref(selection).findIndex((x) => x.id === res.data.id);

  if (res.result) {
    if (ti < 0) {
      selection.value.push(res.data);
    }
  } else {
    if (ti > -1) {
      selection.value.splice(ti, 1);
    }
  }
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