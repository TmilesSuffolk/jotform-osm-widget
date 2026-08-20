var map = L.map('map').setView([37.0, -76.5], 8);
var selectedCoords = null;
var marker = null;
var selectedAddress = null;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

function reverseGeocode(lat, lng, callback) {
  var url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + lat + "&lon=" + lng;

  fetch(url, {
    headers: {
      "User-Agent": "JotformWidgetExample/1.0"
    }
  })
  .then(response => response.json())
  .then(data => {
    callback(data);
  })
  .catch(err => {
    console.error("Reverse geocoding failed:", err);
    callback(null);
  });
}

map.on('click', function(e) {
  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker(e.latlng).addTo(map);

  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  selectedCoords = { lat: lat, lng: lng };

  reverseGeocode(lat, lng, function(result) {
    if (result && result.display_name) {
      selectedAddress = result.display_name;
      console.log("Address:", selectedAddress);
    } else {
      selectedAddress = null;
    }
  });
});

function widgetReady() {
  JFCustomWidget.subscribe("submit", function() {
    var output = {
      lat: selectedCoords ? selectedCoords.lat : null,
      lng: selectedCoords ? selectedCoords.lng : null,
      address: selectedAddress || "",
      raw: selectedAddress ? selectedAddress : ""
    };

    JFCustomWidget.sendData(output);
  });

  JFCustomWidget.requestFrameResize({ height: document.body.scrollHeight });
}

if (window.JFCustomWidget) {
  widgetReady();
} else {
  window.addEventListener("JFCustomWidgetReady", widgetReady);
}
