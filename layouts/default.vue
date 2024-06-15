<template>
  <div style="font-family: 'Poppins'">
    <Navbar />
    <slot />
  </div>
</template>
<script setup>
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>

<style></style>
