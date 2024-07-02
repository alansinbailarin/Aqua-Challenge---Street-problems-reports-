<template>
  <div class="relative inline-block text-left">
    <button
      :id="id"
      @click="toggleDropdown"
      class="text-gray-600 w-full justify-between focus:outline-none font-medium rounded-lg text-sm text-center inline-flex items-center transition-all ease-in-out duration-300"
      type="button"
    >
      {{ dropdownTitle }}
      <svg
        class="w-2.5 h-2.5 ml-2"
        :class="{
          'transform rotate-180 transition-all ease-in-out duration-300':
            isOpen,
          'transform rotate-0 transition-all ease-in-out duration-300': !isOpen,
        }"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>

    <div
      v-if="isOpen"
      :id="dataToggle"
      class="z-10 fixed px-3 py-1.5 mt-3 bg-white rounded-lg shadow right-6 dark:bg-gray-700"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  labelText: {
    type: String,
    required: true,
  },
  dataToggle: {
    type: String,
    required: true,
  },
  dropdownTitle: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}
</script>
