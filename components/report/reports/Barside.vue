<template>
  <aside
    class="w-3/12 bg-white border-r border-gray-100 p-4 shadow-sm overflow-y-auto overflow-auto mt-20"
  >
    <h1 class="text-gray-800 font-extrabold text-lg mb-3">Cerca de ti</h1>
    <ReportReportsReport :reports="reports" />
  </aside>
</template>

<script setup>
const date = useDate();

const props = defineProps({
  reports: {
    type: Array,
    required: true,
  },
});
</script>
<style scoped></style>
