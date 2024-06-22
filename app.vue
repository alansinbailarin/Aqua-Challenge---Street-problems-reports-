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
      src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyDXG97KwFsHeoFr82vJ3D0yBtgWRBq99Xw&libraries=places`,
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
