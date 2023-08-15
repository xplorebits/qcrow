<template>
  <NuxtLayout name="app">
    <UContainer> here - {{ projectId }} </UContainer>
  </NuxtLayout>
</template>

<script setup>
const projectId = useRoute().params?.id || "";
</script>
