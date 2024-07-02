<template>
  <div style="font-family: 'Poppins'">
    <Navbar />
    <MobileSidebar
      :openSidebar="openSidebar"
      @close-sidebar="closeMobileSidebar"
    />
    <slot />
  </div>
</template>
<script setup>
import { initFlowbite } from "flowbite";

const openSidebar = ref(false);

onMounted(() => {
  initFlowbite();
});

const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value;
};

const closeMobileSidebar = () => {
  openSidebar.value = false;
};
</script>

<style></style>
