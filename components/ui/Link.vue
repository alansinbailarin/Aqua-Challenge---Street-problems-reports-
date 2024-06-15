<template>
  <NuxtLink
    class="button-bezel primary-color text-center py-2 px-6 rounded-lg button-shadow transition-colors duration-500 ease-in-out"
  >
    <slot />
  </NuxtLink>
</template>

<script setup></script>

<style scoped>
.button-bezel {
  box-shadow: inset 0 2px 0 0 hsla(0, 0%, 100%, 0.2),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.25), 0 2px 6px 0 rgba(0, 0, 0, 0.1);
}

.primary-color {
  color: rgb(255, 255, 255);
  background-image: linear-gradient(
    rgb(91, 129, 214) 0%,
    rgb(65, 97, 200) 100%
  );
}

:hover.primary-color {
  color: rgb(255, 255, 255);
  background-image: linear-gradient(rgb(65, 97, 200) 0%, rgb(61, 84, 184) 100%);
}
</style>
