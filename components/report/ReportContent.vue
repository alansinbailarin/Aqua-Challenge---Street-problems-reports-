<template>
  <section class="flex-1 p-5 relative">
    <div
      ref="mapContainer"
      class="absolute inset-0 top-16 md:top-20 bottom-14 md:bottom-0"
    ></div>
  </section>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { latitude, longitude, getLocation } = useGeolocation();
const mapContainer = ref(null);
const mapStore = useMapStore();

const reloadAttempts = ref(0);
const maxReloadAttempts = ref(5);

function reloadMap() {
  if (reloadAttempts.value < maxReloadAttempts.value) {
    reloadAttempts.value++;
    console.log(`Intentando recargar el mapa: intento ${reloadAttempts.value}`);
    mapStore.initializeMap(mapContainer.value, latitude.value, longitude.value);

    setTimeout(() => {
      if (!mapStore.isMapLoaded()) {
        reloadMap();
      }
    }, 3000);
  } else {
    console.log("No se pudo cargar el mapa después de varios intentos");
  }
}

onMounted(async () => {
  try {
    await getLocation(); // Espera a que getLocation resuelva la Promesa antes de continuar
    mapStore.initializeMap(mapContainer.value, latitude.value, longitude.value);

    setTimeout(() => {
      if (!mapStore.isMapLoaded()) {
        reloadMap();
      }
    }, 3000);
  } catch (err) {
    console.error("Error al obtener la ubicación:", err);
  }
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
      );
    }
  }
);
</script>

<style></style>
