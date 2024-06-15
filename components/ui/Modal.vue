<template>
  <div
    :id="id"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-md shadow dark:bg-gray-800">
        <div
          class="flex items-center justify-between px-4 py-3 md:p-4 border-b rounded-t dark:border-gray-700"
        >
          <h3
            class="font-extrabold text-base md:text-lg text-gray-900 dark:text-gray-200"
          >
            {{ title }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-all ease-in-out duration-300"
            :data-modal-hide="id"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="px-4 py-3 md:p-4 space-y-4">
          <p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            <slot />
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center px-4 py-3 md:p-4 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <UiButton
            :data-modal-hide="id"
            type="button"
            class="text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {{ acceptText }}
          </UiButton>
          <button
            :data-modal-hide="id"
            type="button"
            class="text-sm py-2.5 px-5 ms-3 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {{ declineText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
  acceptText: String,
  declineText: String,
  id: String,
});
</script>

<style scoped>
.modal-bezel {
  box-shadow: inset 0 2px 0 0 hsla(0, 0%, 100%, 0.2),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.25), 0 2px 6px 0 rgba(0, 0, 0, 0.1);
}
</style>
