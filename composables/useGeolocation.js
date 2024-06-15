import { ref, onMounted } from "vue";

export function useGeolocation() {
  const latitude = ref(null);
  const longitude = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const getLocation = () => {
    loading.value = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
      error.value = "La geolocalización no es soportada por este navegador.";
      loading.value = false;
    }
  };

  const setPosition = (position) => {
    latitude.value = position.coords.latitude;
    longitude.value = position.coords.longitude;
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
  };

  return {
    latitude,
    longitude,
    error,
    loading,
    getLocation,
  };
}
