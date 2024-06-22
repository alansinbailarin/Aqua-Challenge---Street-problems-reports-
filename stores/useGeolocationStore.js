import useLocalstorage from "@/composables/useLocalStorage";

export const useGeolocationStore = defineStore("geolocation", () => {
  const latitude = useLocalstorage(null, "latitude");
  const longitude = useLocalstorage(null, "longitude");

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
