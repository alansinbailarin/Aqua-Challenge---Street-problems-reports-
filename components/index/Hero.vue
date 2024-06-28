import { ref } from 'vue';
<template>
  <div
    class="absolute inset-0 h-full w-full bg-white dark:bg-gray-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#101010_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] flex items-center justify-center"
  >
    <section class="text-center mx-8">
      <h1
        class="font-extrabold text-5xl md:text-7xl text-gray-900 dark:text-gray-300"
      >
        Protege el agua, protege el
        <span futuro class="text-blue-500">futuro</span>
      </h1>
      <p class="mt-5 text-gray-600 font-thin dark:text-gray-400">
        Reporta fugas de agua en tiempo real y ayuda a conservar nuestro recurso
        más valioso.
      </p>

      <UiButton class="mt-8" @click="handleAccept">Reportar fuga</UiButton>
    </section>
  </div>
  <UiLoader v-if="loading && !latitude && !longitude" />
</template>
<script setup>
import { useGeolocation } from "../../composables/useGeolocation";

const { loading, error, latitude, longitude } = useGeolocation();

const router = useRouter();

const handleAccept = () => {
  router.push({
    path: "/report/new",
    query: {
      latitude: latitude.value,
      longitude: longitude.value,
    },
  });
};
</script>
<style scoped></style>
