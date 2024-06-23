<template>
  <div class="relative inline-block text-left">
    <label class="text-gray-900 font-semibold dark:text-gray-300">{{
      labelText
    }}</label>
    <button
      :id="id"
      @click="toggleDropdown"
      class="text-gray-600 mt-1 bg-gray-50 hover:bg-gray-100 w-full justify-between focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all ease-in-out duration-300"
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
      class="absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 dark:divide-gray-600"
    >
      <ul class="text-sm text-gray-700 dark:text-gray-200">
        <li v-for="(item, index) in items" :key="index">
          <button
            @click="selectItem(item, $event)"
            class="block w-full text-left px-4 py-2 hover:bg-gray-50"
          >
            {{ item.text }}
          </button>
        </li>
      </ul>
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
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["selecting"]);
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectItem(item, event) {
  event.preventDefault();
  emit("selecting", item);
  isOpen.value = false;
}
</script>
