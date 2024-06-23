<template>
  <section class="flex-1 p-5" ref="mapContainer"></section>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { latitude, longitude, getLocation } = useGeolocation();
const mapContainer = ref(null);
const mapStore = useMapStore();

onMounted(() => {
  getLocation();
  mapStore.initializeMap(mapContainer.value, latitude.value, longitude.value);
});

watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.latitude && newQuery.longitude) {
      mapStore.addMarker(
        {
          lat: parseFloat(newQuery.latitude),
          lng: parseFloat(newQuery.longitude),
        },
        router
      ); // Pasamos el router aquí
    }
  }
);
</script>
