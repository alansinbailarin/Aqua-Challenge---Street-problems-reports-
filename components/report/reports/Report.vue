<template>
  <div class="flex flex-col gap-3 md:mt-20">
    <h1 class="text-gray-800 font-extrabold text-lg mb-3">Cerca de ti</h1>
    <UiCard
      class="cursor-pointer"
      v-if="reports.length > 0"
      v-for="report in props.reports"
      :key="report.id"
      @click="selectReport(report)"
    >
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-gray-900 font-extrabold text-sm">
            {{ report.title }}
          </h1>
        </div>
        <div>
          <span
            class="text-xs bg-blue-100 text-blue-400 rounded-md px-3 py-1"
            >{{ report.status.text }}</span
          >
        </div>
      </div>
      <span class="text-gray-400 text-xs font-thin">{{
        date.fromNowDate(report.createdAt)
      }}</span>
      <div class="mt-1">
        <p class="line-clamp-3 text-sm text-gray-500 font-light">
          {{ report.description }}
        </p>
      </div>
    </UiCard>
    <div v-else>
      <span class="text-gray-600 text-sm"
        >Ups, parece que aún no se ha publicado ningun reporte...</span
      >
    </div>
  </div>
</template>
<script setup>
const date = useDate();

const props = defineProps({
  reports: {
    type: Array,
    required: true,
  },
});

const reportsMapStore = useReportsMapStore();

function selectReport(report) {
  reportsMapStore.selectReport(report);
}
</script>
