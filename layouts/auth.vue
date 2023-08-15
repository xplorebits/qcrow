<template>
  <div class="h-screen flex items-center justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <p class="text-lg font-meidum">QCrow</p>
      </template>

      <slot />

      <template #footer>
        <div class="flex items-start gap-3">
          <div class="space-y-1">
            <p class="text-xs text-gray-400">
              Copyright &copy; 2023 Xplorebits Technologies.
            </p>
            <p class="text-xs text-gray-400">QCrow is licensed under the MIT</p>
          </div>
          <div class="grow" />
          <NuxtLink to="https://github.com/xplorebits/qcrow" target="_blank">
            <UButton icon="i-bi-github" size="sm" color="white" square variant="ghost" />
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </div>
</template>
