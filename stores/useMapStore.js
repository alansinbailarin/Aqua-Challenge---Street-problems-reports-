export const useMapStore = defineStore("mapStore", () => {
  const selectedLocationName = useLocalStorage(null, "selectedLocationName");
  const selectedLocation = ref({
    lat: null,
    lng: null,
    name: null,
  });
  let map = null;
  let marker = null;

  function initializeMap(mapContainer, latitude, longitude) {
    if (window.google) {
      map = new google.maps.Map(mapContainer, {
        center: { lat: latitude, lng: longitude },
        zoom: 17,
      });

      marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: "Current Location",
      });

      getPlaceName({ lat: latitude, lng: longitude });

      map.addListener("click", (event) => {
        addMarker(
          { lat: event.latLng.lat(), lng: event.latLng.lng() },
          useRouter()
        );
      });
    }
  }

  function isMapLoaded() {
    return map && map.getCenter();
  }

  function addMarker(position, router) {
    if (marker) {
      marker.setMap(null);
    }

    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: "Ubicación seleccionada",
    });

    selectedLocation.value.lat = position.lat;
    selectedLocation.value.lng = position.lng;

    router.replace({
      path: "/report/new",
      query: {
        latitude: position.lat,
        longitude: position.lng,
      },
    });

    getPlaceName(position);
  }

  function getPlaceName(position) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          selectedLocation.value.name = results[0].formatted_address;
          selectedLocationName.value = selectedLocation.value.name;
        } else {
          console.log("Resultados no encontrados");
        }
      } else {
        console.log("Geolocalizador fallido con status: : " + status);
      }
    });
  }

  return {
    selectedLocation,
    selectedLocationName,
    initializeMap,
    addMarker,
    getPlaceName,
    isMapLoaded,
  };
});
