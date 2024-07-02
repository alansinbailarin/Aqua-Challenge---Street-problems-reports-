<template>
  <transition name="sidebar-overlay">
    <div
      v-if="openSidebar"
      class="fixed inset-0 bg-black opacity-30 backdrop-blur-3xl z-10 h-screen"
      @click="closeSidebar"
      @touchend="closeSidebar"
    ></div>
  </transition>
  <aside
    class="fixed top-0 right-0 z-50 bg-white shadow-lg w-[22rem] transform transition-transform ease-in-out duration-300 overflow-y-auto h-full min-h-full"
    :class="{
      'translate-x-0': openSidebar,
      'translate-x-full': !openSidebar,
    }"
  >
    <div class="p-4 flex flex-col justify-between h-screen">
      <div>
        <section v-if="user" class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div v-if="user.providerData[0].photoURL !== null">
              <picture>
                <source
                  :srcset="user.providerData[0].photoURL"
                  media="(orientation: portrait)"
                />
                <img
                  :src="user.providerData[0].photoURL"
                  :alt="`${user.email} image`"
                  class="w-12 rounded-full"
                />
              </picture>
            </div>
            <div v-else class="flex items-center">
              <picture class="cursor-pointer">
                <source
                  srcset="/public/img/noimagep.jpg"
                  media="(orientation: portrait)"
                />
                <img
                  src="/public/img/noimagep.jpg"
                  :alt="`${user.email} image`"
                  class="w-12 rounded-md"
                />
              </picture>
            </div>
            <div>
              <h1 class="font-extrabold text-sm text-gray-800">
                {{ user.uid }}
              </h1>
              <span class="text-gray-400 font-thin text-sm">{{
                user.email
              }}</span>
            </div>
          </div>
        </section>
        <div v-if="user" class="border-b w-full my-4"></div>

        <section>
          <h3 class="text-sm text-gray-400">Recientes</h3>
          <div class="mt-4 space-y-3">
            <div v-for="report in reports">
              <div class="flex gap-3">
                <img
                  :src="report.img"
                  :alt="report.title"
                  class="min-w-16 h-12 object-fill rounded-md shadow-sm"
                />
                <div>
                  <div>
                    <span
                      class="text-sm font-bold text-gray-900 line-clamp-1"
                      >{{ report.title }}</span
                    >
                  </div>
                  <div>
                    <span class="text-gray-400 font-thin text-xs">{{
                      formatReportDate(report.date)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NuxtLink
            to="#"
            class="flex justify-center mt-5 text-xs font-thin text-gray-400"
            >Ver todos</NuxtLink
          >
        </section>
        <div class="border-b w-full my-4"></div>

        <div class="flex flex-col gap-2">
          <button
            class="bg-gray-50 rounded-md px-4 py-2 text-gray-700 font-extrabold"
            @click="goToHome()"
          >
            Inicio
          </button>
          <NuxtLink
            class="bg-gray-50 text-center rounded-md px-4 py-2 text-gray-700 font-extrabold"
            to="#"
            >Incentivos</NuxtLink
          >
        </div>
      </div>

      <section v-if="user" class="bottom-4">
        <button
          class="w-full px-4 py-2 bg-red-500 text-white rounded-md"
          @click="logout"
        >
          Cerrar sesión
        </button>
      </section>
      <section v-else class="flex flex-col gap-2 bottom-4">
        <UiLinkSecondary to="/auth/login" class="md:hidden shadow"
          >Acceder</UiLinkSecondary
        >
        <UiLink
          to="/auth/register"
          class="md:hidden text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Crear Cuenta
        </UiLink>
      </section>
    </div>
  </aside>
</template>
<script setup>
import moment from "moment";

const router = useRouter();
const { latitude, longitude, getLocation } = useGeolocation();
const { userInfo, logout } = useFirebaseAuth();

const user = computed(() => {
  return userInfo.value;
});

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

const reports = ref([
  {
    img: "https://via.placeholder.com/400",
    title: "Reporte de Fuga de Agua",
    date: "2024-06-27",
  },
  {
    img: "https://via.placeholder.com/400",
    title: "Reporte de Contaminación del Agua",
    date: "2024-06-26",
  },
  {
    img: "https://via.placeholder.com/400",
    title: "Reporte de Erosión del Suelo",
    date: "2024-06-25",
  },
]);

const formatReportDate = (date) => {
  return moment(date).fromNow();
};

const goToHome = () => {
  if (latitude.value && longitude.value) {
    router.push({
      path: "/",
      query: {
        latitude: latitude.value,
        longitude: longitude.value,
      },
    });
  }
};

onMounted(() => {
  getLocation();
});
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
