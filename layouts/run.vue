<template>
  <div class="h-screen overflow-hidden">
    <div class="grid grid-cols-12 gap-0 h-full">
      <div class="col-span-2 border-r border-zinc-700">hello</div>
      <div class="col-span-10">
        <slot />
      </div>
    </div>
  </div>
</template>
