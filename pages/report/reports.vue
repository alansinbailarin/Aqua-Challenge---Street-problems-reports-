<template>
  <div class="md:flex md:min-h-screen"></div>
  <UiLoader v-if="loader" />
</template>
<script setup>
const reports = ref(null);
const loader = ref(true);

const getReports = async () => {
  try {
    loader.value = true;
    const response = await useFetch(
      "https://us-central1-atlantes-del-agua.cloudfunctions.net/appPublic/reports"
    );

    reports.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    loader.value = false;
  }
};

onBeforeMount(() => {
  getReports();
});
</script>
