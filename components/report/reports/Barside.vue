import { ReportReportsSelectedReport } from '../../../.nuxt/components';
<template>
  <aside
    class="w-3/12 bg-white border-r border-gray-100 p-4 shadow-sm overflow-y-auto overflow-auto"
  >
    <ReportReportsSelectedReport
      v-if="selectedReport"
      :selectedReport="selectedReport"
      :latitude="latitude"
      :longitude="longitude"
    />
    <ReportReportsReport v-else :reports="reports" />
  </aside>
</template>

<script setup>
const date = useDate();
const reportsMapStore = useReportsMapStore();
const selectedReport = computed(() => reportsMapStore.selectedReport);

const props = defineProps({
  reports: {
    type: Array,
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
</script>
<style scoped></style>
