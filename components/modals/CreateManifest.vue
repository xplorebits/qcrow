<template>
  <UModal v-model="isOpen" :prevent-close="isSubmitting" :ui="{ width: 'sm:max-w-5xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3 h-full">
          Create Manifest

          <UInput v-bind="name" size="lg" placeholder="Enter manifest name" />

          <div class="grow" />
          <p v-if="name.value" class="text-sm text-zinc-600">{{ name.value }}</p>
        </div>
      </template>

      <manifest-edit-manifest :selection="selection" @select="onSelectTestCase" />

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
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useProject } from "@/store/project";
import { useTestCase } from "@/store/testCase";
import { useManifest } from "@/store/manifest";

const isRetry = ref(false);
const isOpen = ref(false);
const storeProejct = useProject();
const storeTestCase = useTestCase();
const storeManifest = useManifest();

const { values, meta, handleSubmit, defineInputBinds, resetForm, isSubmitting } = useForm(
  {
    validationSchema: {
      name: yup.string().required(),
    },
    initialValues: {
      name: "",
    },
  }
);

watch(isOpen, (value) => {
  if (!value) {
    resetForm();
    isRetry.value = false;
  }
});

const name = defineInputBinds("name");

const selection = ref([]);

/* const testCases = ref([
  // { id: "auth-login-success", title: "Successfull Login" }
  { id: "auth-login-success", title: "Successfull Login" },
  { id: "auth-login-success-2", title: "Unsuccessfull Login" },
  { id: "auth-login-success-3", title: "Successfull Signup" },
  { id: "auth-login-success-4", title: "Unsuccessfull Signup" },
  { id: "auth-login-success-5", title: "Successfull Reset Password" },
  { id: "auth-login-success-6", title: "Unsuccessfull Reset Password" },
]); */

const open = function () {
  isOpen.value = true;
};

const close = function () {
  selection.value = [];
  isOpen.value = false;
};

const onSelectTestCase = function (res) {
  const ti = unref(selection).findIndex((x) => x._id === res.data._id);
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

    storeManifest
      .createManifest(
        { name: values.name, selection: selection.value },
        useRoute().params.id
      )
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
