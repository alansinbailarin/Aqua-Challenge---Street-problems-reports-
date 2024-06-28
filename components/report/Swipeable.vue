<template>
  <div
    :class="[
      'fixed w-full shadow-lg bg-white border-t border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-800 transition-transform ease-in-out duration-300 left-0 right-0 top-96',
      {
        'translate-y-full bottom-[60px]': !isOpen,
        'translate-y-0  bottom-0 h-[60vh] shadow-xl': isOpen,
      },
    ]"
  >
    <div
      @click="toggleSwipper"
      class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <span
        class="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg left-1/2 dark:bg-gray-600"
      ></span>
      <h5
        class="inline-flex items-center text-base text-gray-500 dark:text-gray-400 font-medium"
      ></h5>
    </div>
    <div class="flex flex-col h-full">
      <div class="flex-1 overflow-y-auto p-4 pb-[70px]">
        <ReportContentMobile />
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = useLocalStorage(false, "drawerOpen");

function toggleSwipper() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped></style>
