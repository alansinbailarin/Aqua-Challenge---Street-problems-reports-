<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
const { getLocation } = useGeolocation();

useHead({
  script: [
    {
      src: `https://maps.googleapis.com/maps/api/js?key=${config.public.mapsApiKey}&loading=async&libraries=places`,
      defer: true,
      async: true,
    },
  ],
});

onMounted(() => {
  getLocation();
});
</script>
<style></style>
