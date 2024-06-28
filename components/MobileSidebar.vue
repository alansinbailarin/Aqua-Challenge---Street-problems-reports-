<template>
  <transition name="sidebar-overlay">
    <div
      v-if="openSidebar"
      class="fixed inset-0 bg-black opacity-30 backdrop-blur-3xl z-10 h-screen"
      @click="closeSidebar"
    ></div>
  </transition>
  <aside
    class="fixed top-0 right-0 z-50 h-screen bg-white shadow-lg w-80 transform transition-transform ease-in-out duration-300"
    :class="{
      'translate-x-0': openSidebar,
      'translate-x-full': !openSidebar,
    }"
  >
    <div class="p-4">
      <section class="flex items-center justify-between">
        <div>
          <p class="font-semibold text-gray-800">Alan Pacheco</p>
          <p class="text-sm text-gray-400 font-thin">agpsalgado@gmail.com</p>
        </div>
        <div>
          <span
            class="bg-white border text-sm text-gray-700 border-gray-200 rounded-full px-3 py-1"
            >190</span
          >
        </div>
      </section>
      <div class="border-b w-full my-4"></div>

      <section>
        <h3 class="text-sm text-gray-400">Recientes</h3>
        <div class="mt-4 space-y-3">
          <div v-for="report in reports">
            <div class="flex gap-3">
              <img
                :src="report.img"
                :alt="report.title"
                class="min-w-16 h-12 object-fill rounded-md shadow-sm"
              />
              <div>
                <div>
                  <span class="text-sm font-bold text-gray-900 line-clamp-1">{{
                    report.title
                  }}</span>
                </div>
                <div>
                  <span class="text-gray-400 font-thin text-xs">{{
                    formatReportDate(report.date)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NuxtLink
          to="#"
          class="flex justify-center mt-5 text-xs font-thin text-gray-400"
          >Ver todos</NuxtLink
        >
      </section>
      <div class="border-b w-full my-4"></div>
    </div>
  </aside>
</template>
<script setup>
import moment from "moment";

const props = defineProps({
  openSidebar: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closeSidebar"]);

function closeSidebar() {
  emit("closeSidebar");
}

const reports = ref([
  {
    img: "https://via.placeholder.com/400",
    title: "Reporte de Fuga de Agua",
    date: "2024-06-27",
  },
  {
    img: "https://via.placeholder.com/400",
    title: "Reporte de Contaminación del Agua",
    date: "2024-06-26",
  },
  {
    img: "https://via.placeholder.com/400",
    title: "Reporte de Erosión del Suelo",
    date: "2024-06-25",
  },
]);

const formatReportDate = (date) => {
  return moment(date).fromNow();
};
</script>

<style scoped>
.sidebar-overlay-enter-active,
.sidebar-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-overlay-enter-from,
.sidebar-overlay-leave-to {
  opacity: 0;
}
</style>
