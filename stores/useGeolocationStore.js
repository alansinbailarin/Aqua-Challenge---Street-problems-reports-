import useLocalstorage from "@/composables/useLocalStorage";

export const useGeolocationStore = defineStore("geolocation", () => {
  const latitude = useLocalstorage("latitude", null);
  const longitude = useLocalstorage("longitude", null);

  const setLocation = (lat, long) => {
    latitude.value = lat;
    longitude.value = long;
  };

  return {
    latitude,
    longitude,
    setLocation,
  };
});
