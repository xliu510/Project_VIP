// Creating map object
var myMap = L.map("map", {
  center: [41.2565, -95.9345],
  zoom: 5
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var url = "atm-data.html";

// Grab the data with d3
d3.json(url, function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var lat = parseFloat(response[i].lat);
    var lng = parseFloat(response[i].lng);
    var address = response[i].address;

    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([lat, lng])
      .bindPopup(address));


  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
