import { ref, onMounted } from "vue";
import { useGeolocationStore } from "~/stores/useGeolocationStore";

export function useGeolocation() {
  const latitude = useLocalStorage(null, "latitude");
  const longitude = useLocalStorage(null, "longitude");
  const error = ref(null);
  const loading = ref(false);
  const router = useRouter();
  const geolocationStore = useGeolocationStore();

  const getLocation = () => {
    loading.value = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
      error.value = "La geolocalización no es soportada por este navegador.";
      loading.value = false;

      latitude.value = 18.937774662711945;
      longitude.value = -98.99769978949402;
      setUrlParameters();
    }
  };

  const setPosition = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    latitude.value = lat;
    longitude.value = long;
    geolocationStore.setLocation(lat, long);
    setUrlParameters();
    loading.value = false;
  };

  const showError = (err) => {
    loading.value = false;
    switch (err.code) {
      case err.PERMISSION_DENIED:
        error.value = "El usuario denegó la solicitud de geolocalización.";
        break;
      case err.POSITION_UNAVAILABLE:
        error.value = "La información de ubicación no está disponible.";
        break;
      case err.TIMEOUT:
        error.value = "La solicitud para obtener la ubicación se agotó.";
        break;
      case err.UNKNOWN_ERROR:
        error.value = "Se produjo un error desconocido.";
        break;
    }

    latitude.value = 18.937774662711945;
    longitude.value = -98.99769978949402;
    setUrlParameters();
  };

  const setUrlParameters = () => {
    router.push({
      query: {
        latitude: latitude.value,
        longitude: longitude.value,
      },
    });
  };

  return {
    latitude,
    longitude,
    error,
    loading,
    getLocation,
  };
}
