<template>
  <section class="flex-1 p-5" ref="mapContainer"></section>
</template>
<script setup>
const route = useRoute();
const router = useRouter();
const { latitude, longitude } = useGeolocation();

const mapContainer = ref(null);
let map;
let marker = null;
const selectedLocation = ref({
  lat: null,
  lng: null,
  name: null,
});
const selectedLocationName = useLocalStorage(null, "selectedLocationName");

onMounted(() => {
  if (window.google) {
    map = new google.maps.Map(mapContainer.value, {
      center: { lat: latitude.value, lng: longitude.value },
      zoom: 15,
    });

    marker = new google.maps.Marker({
      position: { lat: latitude.value, lng: longitude.value },
      map: map,
      title: "Current Location",
    });

    getPlaceName({ lat: latitude.value, lng: longitude.value });

    map.addListener("click", (event) => {
      addMarker(event.latLng);
    });
  }
});

function addMarker(position) {
  if (marker) {
    marker.setMap(null);
  }

  marker = new google.maps.Marker({
    position: position,
    map: map,
    title: "Selected Location",
  });

  selectedLocation.value.lat = position.lat();
  selectedLocation.value.lng = position.lng();

  router.replace({
    path: route.path,
    query: {
      ...route.query,
      latitude: position.lat(),
      longitude: position.lng(),
    },
  });

  getPlaceName(position);
}

function getPlaceName(position) {
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode(
    {
      location: position,
    },
    (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          selectedLocation.value.name = results[0].formatted_address;
          selectedLocationName.value = selectedLocation.value.name;
          console.log(`Selected location: ${selectedLocation.value.name}`);
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    }
  );
}
</script>
