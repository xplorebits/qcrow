<template>
  <div class="relative h-screen">
    <div class="absolute top-0 right-0 left-0 h-32 border-b border-zinc-700">
      <slot name="header" />
    </div>
    <div class="absolute top-32 right-0 bottom-0 left-0">
      <slot name="body" />
    </div>
  </div>
</template>
