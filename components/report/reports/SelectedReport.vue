<template>
  <section class="md:mt-20">
    <div class="flex gap-1">
      <div class="mt-1">
        <span @click="resetLocation" class="text-gray-400 hover:cursor-pointer"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            color="current"
            fill="none"
          >
            <path
              d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
      <div>
        <h1 class="text-gray-800 font-extrabold text-lg flex items-center">
          {{ selectedReport.title }}
        </h1>
        <span class="text-sm text-gray-400">{{
          date.fromNowDate(selectedReport.createdAt)
        }}</span>
      </div>
    </div>

    <p class="text-blue-400 text-sm mt-2">{{ selectedReport.address }}</p>
    <p class="text-sm mt-1 text-gray-500">{{ selectedReport.description }}</p>
    <div class="flex flex-col gap-2 mt-3">
      <div class="flex items-center gap-2">
        <span class="bg-blue-400 text-white p-1 rounded-full"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="15"
            height="15"
            color="current"
            fill="none"
          >
            <path
              d="M3.5 13.678C3.5 9.49387 7.08079 5.35907 9.59413 2.97222C10.9591 1.67593 13.0409 1.67593 14.4059 2.97222C16.9192 5.35907 20.5 9.49387 20.5 13.678C20.5 17.7804 17.2812 22 12 22C6.71878 22 3.5 17.7804 3.5 13.678Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M16 14C16 16.2091 14.2091 18 12 18"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p class="text-sm text-gray-700">{{ selectedReport.leak.text }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="bg-violet-400 text-white p-1 rounded-full"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="15"
            height="15"
            color="current"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M12 8V12L14 14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p class="text-sm text-gray-700">{{ selectedReport.duration.text }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="bg-red-400 text-white p-1 rounded-full"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="15"
            height="15"
            color="current"
            fill="none"
          >
            <path
              d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M12.2422 17V13C12.2422 12.5286 12.2422 12.2929 12.0957 12.1464C11.9493 12 11.7136 12 11.2422 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.992 8.99997H12.001"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p class="text-sm text-gray-700">{{ gravityText }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="bg-indigo-400 text-white p-1 rounded-full"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="15"
            height="15"
            color="current"
            fill="none"
          >
            <path
              d="M17.5 10.5L19.5 12.5M14 14L16 16M10.5 17.5L12.5 19.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M10.5355 4.67767C11.9002 3.31296 12.5826 2.6306 13.3438 2.3153C14.3587 1.8949 15.4991 1.8949 16.5141 2.3153C17.2753 2.6306 17.9576 3.31296 19.3223 4.67767C20.687 6.04238 21.3694 6.72474 21.6847 7.48594C22.1051 8.50088 22.1051 9.64126 21.6847 10.6562C21.3694 11.4174 20.687 12.0998 19.3223 13.4645L13.4645 19.3223C12.0998 20.687 11.4174 21.3694 10.6562 21.6847C9.64126 22.1051 8.50088 22.1051 7.48594 21.6847C6.72474 21.3694 6.04238 20.687 4.67767 19.3223C3.31296 17.9576 2.6306 17.2753 2.3153 16.5141C1.8949 15.4991 1.8949 14.3587 2.3153 13.3438C2.6306 12.5826 3.31296 11.9002 4.67767 10.5355L10.5355 4.67767Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p class="text-sm text-gray-700">{{ selectedReport.size.text }}</p>
      </div>
    </div>

    <div class="mt-4" v-if="selectedReport.impacts.length > 0">
      <h2 class="text-gray-800 font-bold">Impacto ambiental</h2>
      <ul
        class="max-w-md mt-1 space-y-1 text-gray-500 list-disc list-inside text-sm"
      >
        <li v-for="impact in selectedReport.impacts">{{ impact.text }}</li>
      </ul>
    </div>
    <div class="mt-4" v-if="selectedReport.images.length > 0">
      <h2 class="text-gray-800 font-bold mb-1">Archivos adjuntos</h2>

      <div :class="gridClass">
        <div v-for="image in selectedReport.images">
          <picture>
            <source :src="image" />
            <img :src="image" alt="" class="rounded-lg" />
          </picture>
        </div>
      </div>
    </div>
  </section>
  <!-- <div class="mt-8">
    <h2 class="text-gray-800 font-bold mb-1">Actualiza este reporte</h2>
    <UiTextAreaInput
      label-for="report-update"
      placeholder="Este caso ya fue arreglado..."
    />
    <h2 class="text-gray-800 font-bold mb-1 mt-2">Adjunta pruebas</h2>
    <UiFileInput />
  </div> -->
</template>
<script setup>
const props = defineProps({
  selectedReport: {
    type: Object,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const reportsMapStore = useReportsMapStore();
const { setGravityText } = useUtils();
const date = useDate();

const gravityText = computed(() =>
  setGravityText(props.selectedReport.gravity)
);

function resetLocation() {
  reportsMapStore.resetMap(props.latitude, props.longitude);
}

const gridClass = computed(() => {
  const length = props.selectedReport.images.length;
  if (length === 1 || length === 2) return "grid grid-cols-1 gap-2";
  if (length === 3 || length === 4) return "grid grid-cols-2 gap-2";
  if (length > 4) return "grid grid-cols-3 gap-2";

  return "grid grid-cols-4 gap-2";
});
</script>
<style scoped>
.grid div:nth-child(1) {
  grid-column: span 2;
  grid-row: span 2;
}
</style>
