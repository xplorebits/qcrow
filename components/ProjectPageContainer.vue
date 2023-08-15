<template>
  <div class="relative h-full">
    <div
      class="absolute top-0 right-0 left-0 h-12 flex items-center gap-3 px-3 border-b border-b-zinc-800"
    >
      <slot name="header" />
    </div>
    <div class="absolute top-12 right-0 bottom-0 left-0 p-3 overflow-y-auto">
      <slot name="body" />
    </div>
  </div>
</template>
