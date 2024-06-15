<template>
  <button
    class="button-bezel transition-all duration-300 ease-in-out text-sm py-2 px-6 ms-3 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600"
  >
    <slot />
  </button>
</template>
<script setup></script>
<style scoped>
.button-bezel {
  box-shadow: inset 0 2px 0 0 hsla(0, 0%, 100%, 0.2),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.25), 0 2px 6px 0 rgba(0, 0, 0, 0.1);
}
</style>
