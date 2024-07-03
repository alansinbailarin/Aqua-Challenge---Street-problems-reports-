<template>
  <section class="flex-1 p-5 relative">
    <div
      ref="mapReports"
      class="absolute inset-0 top-16 md:top-20 bottom-14 md:bottom-0"
    ></div>
  </section>
</template>

<script setup>
const props = defineProps({
  reports: {
    type: Array,
    required: true,
  },
});

const mapReports = ref(null);
const reportsMapStore = useReportsMapStore();
const { latitude, longitude, getLocation } = useGeolocation();

onMounted(async () => {
  await getLocation();

  reportsMapStore.initializeMap(
    mapReports.value,
    latitude.value,
    longitude.value
  );

  watch(
    () => props.reports,
    (newReports) => {
      if (newReports && newReports.length) {
        newReports.forEach((report) => {
          const { geopoint } = report.location;
          if (geopoint) {
            reportsMapStore.addReportMarker({
              lat: geopoint._latitude,
              lng: geopoint._longitude,
            });
          }
        });
      }
    },
    { immediate: true }
  );
});
</script>
