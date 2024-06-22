<template>
  <label
    class="text-gray-900 font-semibold dark:text-gray-300"
    :for="labelFor"
    >{{ labelText }}</label
  >
  <textarea
    :id="labelFor"
    :rows="rows"
    :cols="cols"
    class="w-full text-sm p-2 border mt-2 border-gray-100 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 placeholder:text-gray-300 dark:placeholder:text-gray-500 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-400 focus:border-transparent"
    :placeholder="placeholder"
  />
</template>
<script setup>
const props = defineProps({
  labelText: String,
  labelFor: String,
  rows: {
    type: Number,
    default: 4,
  },
  cols: {
    type: Number,
    default: 50,
  },
  placeholder: {
    type: String,
    default: "",
  },
});
</script>
