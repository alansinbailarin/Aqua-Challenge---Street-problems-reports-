<template>
  <div class="md:flex md:min-h-screen">
    <ReportReportsBarside class="hidden md:block h-screen" :reports="reports" />
    <ReportReportsMap class="h-screen" :reports="reports" />
    <ReportReportsSwipeable class="md:hidden" :reports="reports" />
  </div>
  <UiLoader v-if="loader" />
</template>

<script setup>
import axios from "axios";

const { getLocation } = useGeolocation();
const route = useRoute();
const reports = ref([]);
const loader = ref(true);
const latitude = ref(route.query.latitude);
const longitude = ref(route.query.longitude);

const getReports = async () => {
  try {
    loader.value = true;
    const response = await axios.get(
      `https://us-central1-atlantes-del-agua.cloudfunctions.net/appPublic/reports?latitude=${latitude.value}&longitude=${longitude.value}`
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
  getLocation();
  getReports();
  console.log(route);
});
</script>
