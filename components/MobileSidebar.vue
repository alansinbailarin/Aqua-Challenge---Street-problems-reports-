<template>
  <transition name="sidebar-overlay">
    <div
      v-if="openSidebar"
      class="fixed inset-0 bg-black opacity-30 backdrop-blur-3xl z-10"
      @click="closeSidebar"
    ></div>
  </transition>
  <aside
    class="fixed top-0 right-0 z-50 h-screen bg-white shadow-lg w-80 transform transition-transform ease-in-out duration-300"
    :class="{
      'translate-x-0': openSidebar,
      'translate-x-full': !openSidebar,
    }"
  >
    <div class="p-4">
      <h1 class="text-lg font-bold mb-4">Sidebar Content</h1>
      <p>Este es el contenido del sidebar.</p>
    </div>
  </aside>
</template>
<script setup>
const props = defineProps({
  openSidebar: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closeSidebar"]);

function closeSidebar() {
  emit("closeSidebar");
}
</script>

<style scoped>
.sidebar-overlay-enter-active,
.sidebar-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-overlay-enter-from,
.sidebar-overlay-leave-to {
  opacity: 0;
}
</style>
