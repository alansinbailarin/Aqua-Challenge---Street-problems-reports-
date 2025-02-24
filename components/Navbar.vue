<template>
  <nav
    :class="{
      'bg-white': !isTransparent,
      'bg-white dark:bg-gray-950 bg-opacity-80 backdrop-filter backdrop-blur transition-all duration-300 ease-in-out bg-gradient-to-t from-transparent via-transparent to-white dark:to-gray-950':
        isTransparent,
    }"
    class="z-10 w-full py-5 px-5 md:px-8 sticky top-0 border-b border-gray-100 dark:border-gray-900"
  >
    <div class="flex items-center justify-between">
      <div class="hidden md:flex items-center gap-7">
        <button @click="goToHome()" class="text-gray-700 font-bold">
          Inicio
        </button>
        <button @click="exploreReports" class="text-gray-700 font-bold">
          Explorar reportes
        </button>
        <NuxtLink to="#" class="text-gray-700 font-bold">Recompensas</NuxtLink>
      </div>
      <div>
        <button
          @click="goToHome()"
          class="text-xl font-bold text-gray-900 dark:text-gray-300"
        >
          WaterWatch
        </button>
      </div>
      <div v-if="user" class="hidden md:block">
        <picture v-if="user.providerData[0].photoURL !== null">
          <source
            :srcset="user.providerData[0].photoURL"
            media="(orientation: portrait)"
          />
          <img
            :src="user.providerData[0].photoURL"
            :alt="`${user.email} image`"
            class="w-10 rounded-full"
          />
        </picture>
        <div v-else class="flex items-center">
          <picture class="cursor-pointer">
            <source
              srcset="/public/img/noimagep.jpg"
              media="(orientation: portrait)"
            />
            <img
              src="/public/img/noimagep.jpg"
              :alt="`${user.email} image`"
              class="w-10 rounded-full"
            />
          </picture>
          <UiDropdownU>
            <h1 class="font-extrabold text-sm text-gray-800">{{ user.uid }}</h1>
            <span class="text-gray-400 font-thin text-sm">{{
              user.email
            }}</span>
            <div class="mt-4">
              <button
                type="button"
                @click="logout"
                class="text-sm text-gray-700 font-semibold hover:text-red-500 w-full text-left transition-colors ease-in-out duration-300"
              >
                Cerrar sesión
              </button>
            </div>
          </UiDropdownU>
        </div>
      </div>
      <div class="gap-4 flex items-center" v-else>
        <UiLinkSecondary to="/auth/login" class="hidden md:flex shadow"
          >Acceder</UiLinkSecondary
        >
        <UiLink
          to="/auth/register"
          class="hidden md:flex text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Crear Cuenta
        </UiLink>
      </div>
      <div class="md:hidden">
        <button @click="toggleSidebar" class="text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#000000"
            fill="none"
          >
            <path
              d="M10 5L20 5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 12L20 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 19L14 19"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    <MobileSidebar
      :openSidebar="openSidebar"
      @close-sidebar="closeMobileSidebar"
    />
  </nav>
</template>
<script setup>
const isTransparent = ref(false);
const openSidebar = ref(false);
const router = useRouter();
const { latitude, longitude, getLocation } = useGeolocation();
const { userInfo, logout } = useFirebaseAuth();
const user = computed(() => {
  return userInfo.value;
});

onMounted(() => {
  getLocation();
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  const threshold = 10;

  isTransparent.value = scrollPosition > threshold;
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

const exploreReports = () => {
  if (latitude.value && longitude.value) {
    router.push({
      path: "/report/reports",
      query: {
        latitude: latitude.value,
        longitude: longitude.value,
      },
    });
  }
};

const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value;
};

const closeMobileSidebar = () => {
  openSidebar.value = false;
};
</script>
<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  transition: background-color 0.5s ease-in-out,
    backdrop-filter 0.3s ease-in-out;
}
</style>
