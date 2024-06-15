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

      <UiButton
        class="mt-8"
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        @click="getLocation"
        >Reportar fuga</UiButton
      >
    </section>
  </div>
  <UiModal
    title="Reporta tu problema"
    accept-text="Reportar"
    decline-text="Cancelar"
    id="default-modal"
  >
    <div>
      <!-- Aqui pondre la descripcion de lo que se hara con este modal-->
      <p class="text-sm mb-2 leading-relaxed text-gray-400 dark:text-gray-400">
        Los detalles de tu reporte serán enviados a las autoridades locales, a
        los encargados de la red de agua potable de tu comunidad y a todos los
        usuarios interesados en ver el reporte.
      </p>
      <div class="mb-2">
        <UiTextInput
          label-text="Titulo del reporte"
          label-for="report-title"
          placeholder="Escribe el titulo de tu reporte"
        />
      </div>
      <div>
        <UiTextAreaInput
          label-text="Explicanos el problema"
          label-for="report-description"
          placeholder="Escribe un poco acerca del problema que esta sucediendo en tu comunidad"
          rows="6"
          cols="50"
        />
      </div>
    </div>
  </UiModal>
  <UiLoader v-if="loading && !latitude && !longitude" />
</template>
<script setup>
import { useGeolocation } from "../../composables/useGeolocation";

const { latitude, longitude, loading, error, getLocation } = useGeolocation();
</script>
<style scoped></style>
