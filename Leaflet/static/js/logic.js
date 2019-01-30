
function createMap(atmlocations, heat) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": darkmap
  };

  // Create an overlayMaps object to hold the marker layer
  var overlayMaps = {
    "ATM Locations": atmlocations,
    "Heatmap": heat
  };

  // Creating map object
  var myMap = L.map("map", {
    center: [41.2565, -95.9345],
    zoom: 5,
    layers: [lightmap, atmlocations]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// Grab the data with d3
d3.json("atm-data.html", function(response) {

  var latlngs = []; 
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var lat = parseFloat(response[i].lat);
    var lng = parseFloat(response[i].lng);
    var address = response[i].address;

    latlngs.push([lat,lng])

    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([lat, lng])
      .bindPopup(address));
  }


  var heat = L.heatLayer(
      latlngs, 
      {radius: 50}, 
      {maxZoom:3}, 
      {minOpacity:0} //,
      // {gradient: {
      //   0.0: 'green',
      //   0.45: 'yellow',
      //   0.9: 'red'
      // }  
      // }
    );

  // Add our marker cluster layer to the map
  createMap(markers, heat);

});
