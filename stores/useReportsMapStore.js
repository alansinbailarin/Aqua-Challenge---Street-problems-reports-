export const useReportsMapStore = defineStore("reportsMapStore", () => {
  let map = null;
  const reportMarkers = ref([]);

  function initializeMap(mapContainer, latitude, longitude) {
    if (window.google) {
      const mexicoBounds = {
        north: 32.718653,
        south: 14.532866,
        west: -118.455109,
        east: -86.811982,
      };

      map = new google.maps.Map(mapContainer, {
        center: { lat: latitude, lng: longitude },
        zoom: 17,
        restriction: {
          latLngBounds: mexicoBounds,
          strictBounds: true,
        },
      });
    }
  }

  function addReportMarker(position) {
    const newMarker = new google.maps.Marker({
      position: position,
      map: map,
      title: "Ubicación de reporte",
    });

    reportMarkers.value.push(newMarker);
  }

  function isMapLoaded() {
    return map && map.getCenter();
  }

  return {
    reportMarkers,
    initializeMap,
    addReportMarker,
    isMapLoaded,
  };
});
