export const useReportsMapStore = defineStore("reportsMapStore", () => {
  let map = null;
  const reportMarkers = ref([]);
  const selectedReport = ref(null);

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
        zoom: 13,
        restriction: {
          latLngBounds: mexicoBounds,
          strictBounds: true,
        },
      });
    }
  }

  function addReportMarker(report) {
    const newMarker = new google.maps.Marker({
      position: {
        lat: report.coordinates._latitude,
        lng: report.coordinates._longitude,
      },
      map: map,
      title: report.title,
    });

    newMarker.addListener("click", () => {
      selectReport(report);
    });

    reportMarkers.value.push(newMarker);
  }

  function isMapLoaded() {
    return map && map.getCenter();
  }

  function selectReport(report) {
    selectedReport.value = report;
    map.setCenter({
      lat: report.coordinates._latitude,
      lng: report.coordinates._longitude,
    });

    map.setZoom(17);
  }

  function resetMap(latitude, longitude) {
    if (map) {
      map.setCenter({ lat: latitude, lng: longitude });
      map.setZoom(13);
    }

    selectedReport.value = null;
  }

  return {
    reportMarkers,
    initializeMap,
    addReportMarker,
    isMapLoaded,
    selectReport,
    selectedReport,
    resetMap,
  };
});
