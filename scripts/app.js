let icon = "./images/earthquake24.png";
let weekly_quakes_endpoint =
  "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
let features = [];
$(document).ready(function() {
  $.ajax({
    url: weekly_quakes_endpoint,
    method: "GET",
    success: function(response) {
      console.log(response);
      response.features.forEach(function(feature) {
        features.push(feature);
        $("#info").append(`<p>${feature.properties.title}</p>`);
      });
      function initMap() {
        let map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 37.8044, lng: -122.2711 },
          zoom: 5
        });
        features.forEach(function(feature) {
          let location = {
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0]
          };
          let marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: icon
          });
        });
      }
      initMap();
    }
  });
});
