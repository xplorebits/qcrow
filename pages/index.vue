<template>
  <NuxtLayout name="app"> </NuxtLayout>
</template>

<script setup>
const emits = defineEmits(["foo"]);

onMounted(() => {
  setTimeout(() => {
    emits("foo");
  }, 1000);
});
</script>
