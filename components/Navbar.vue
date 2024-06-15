<template>
  <nav
    :class="{
      'bg-white dark:bg-gray-950': !isTransparent,
      'bg-white dark:bg-gray-950 bg-opacity-80 backdrop-filter backdrop-blur transition-all duration-300 ease-in-out bg-gradient-to-t from-transparent via-transparent to-white dark:to-gray-950':
        isTransparent,
    }"
    class="z-10 bg-white dark:bg-gray-950 w-full py-5 px-5 md:px-8 sticky top-0 border-b border-gray-100 dark:border-gray-900"
  >
    <div class="flex items-center justify-between">
      <div>
        <NuxtLink
          to="/"
          class="text-xl font-bold text-gray-900 dark:text-gray-300"
        >
          WaterWatch
        </NuxtLink>
      </div>
      <div class="gap-4 flex items-center">
        <NuxtLink to="/report/reports">Ver Reportes</NuxtLink>
        <UiLink
          to="/report/report"
          class="text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Reportar fuga
        </UiLink>
      </div>
    </div>
  </nav>
</template>
<script setup>
const isTransparent = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  const threshold = 10;

  isTransparent.value = scrollPosition > threshold;
};
</script>
<style scoped>
nav {
  /* backdrop-filter: none;  Para desactivar el desenfoque en navegadores que no lo admiten */
  transition: background-color 0.5s ease-in-out,
    backdrop-filter 0.3s ease-in-out;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
