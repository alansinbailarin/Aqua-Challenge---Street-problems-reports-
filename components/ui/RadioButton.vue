<template>
  <input
    type="radio"
    id="hosting-small"
    name="hosting"
    value="hosting-small"
    class="hidden peer"
    required
  />
  <label
    for="hosting-small"
    class="inline-flex items-center justify-between p-3 text-gray-500 bg-white border border-gray-200 rounded-md cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 transition-all ease-in-out duration-300"
  >
    <div class="block">
      <div class="font-semibold">0-50 MB</div>
      <div class="">Good for small websites</div>
    </div>
  </label>
</template>
<script setup></script>
