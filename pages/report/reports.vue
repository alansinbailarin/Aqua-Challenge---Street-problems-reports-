<template>
  <div class="md:flex md:min-h-screen">
    <ReportReportsBarside class="hidden md:block h-screen" :reports="reports" />
    <ReportReportsMap class="h-screen" :reports="reports" />
    <ReportReportsSwipeable class="md:hidden" :reports="reports" />
  </div>
  <UiLoader v-if="loader" />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const reports = ref([]);
const loader = ref(true);

const getReports = async () => {
  try {
    loader.value = true;
    const response = await axios.get(
      "https://us-central1-atlantes-del-agua.cloudfunctions.net/appPublic/reports"
    );

    reports.value = response.data;
    console.log(reports.value);
  } catch (error) {
    console.error("Error fetching reports:", error);
  } finally {
    loader.value = false;
  }
};

onBeforeMount(() => {
  getReports();
});
</script>
