<template>
  <label
    class="text-gray-900 font-semibold dark:text-gray-300"
    :for="labelFor"
    >{{ labelText }}</label
  >
  <input
    type="text"
    :id="labelFor"
    :placeholder="placeholder"
    class="w-full p-2 text-sm border mt-2 dark:placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 border-gray-100 bg-gray-50 placeholder:text-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-400 focus:border-transparent"
  />
</template>

<script setup>
const props = defineProps({
  labelText: String,
  labelFor: String,
  placeholder: {
    type: String,
    default: "",
  },
});
</script>
