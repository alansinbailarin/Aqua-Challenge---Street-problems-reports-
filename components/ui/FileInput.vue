<template>
  <div>
    <div class="flex items-center justify-center w-full">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-3 pb-3">
          <svg
            class="w-8 h-8 mb-4 text-gray-400 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click para añadir</span>
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-400">
            PNG, JPG, MP4 (MAX. 1024x1024px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          @change="handleFileChange"
          multiple
        />
      </label>
    </div>

    <div v-if="previewImages.length > 0">
      <h3 class="mb-3 font-semibold mt-3">Archivos Seleccionados:</h3>
      <div :class="gridClass">
        <div
          v-for="(preview, index) in previewImages"
          :key="index"
          class="relative"
        >
          <button
            @click.prevent="removePreview(index)"
            class="absolute top-0 z-50 right-0 p-1 bg-gray-200 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M14.707 5.293a1 1 0 010 1.414L11.414 10l3.293 3.293a1 1 0 11-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 111.414-1.414L10 8.586l3.293-3.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <img
            v-if="preview.type.startsWith('image')"
            :src="preview.url"
            alt="Preview"
            class="w-full h-full object-cover rounded-lg shadow-md"
          />
          <video
            v-else
            :src="preview.url"
            class="w-full h-full object-cover rounded-lg shadow-md"
            controls
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const fileStore = useFileStore();

const previewImages = fileStore.previewImages;

function handleFileChange(event) {
  const files = event.target.files;
  if (!files) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    fileStore.addFile(file);
  }
}

function removePreview(index) {
  fileStore.removeFile(index);
}

const gridClass = computed(() => {
  const length = previewImages.length;
  if (length === 1 || length === 2) return "grid grid-cols-1 gap-2";
  if (length === 3 || length === 4) return "grid grid-cols-2 gap-2";
  if (length === 5) return "grid grid-cols-2 gap-2";
  return "grid grid-cols-4 gap-2";
});
</script>

<style scoped>
.grid div:nth-child(1) {
  grid-column: span 2;
  grid-row: span 2;
}
</style>
