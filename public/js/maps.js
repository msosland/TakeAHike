
var map;

var initMap = function (places, cen) {
  var myLatLng = {lat: 41.878, lng: -87.629};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: cen
  });

  var elevator = new google.maps.ElevationService();

  var infowindow = new google.maps.InfoWindow();

  places.forEach(function(place) {
    var marker = new google.maps.Marker({
      position: {lat: place.latitude, lng: place.longitude},
      map: map,
      title: 'Hello World!'
    });
    google.maps.event.addListener(marker, 'click', function(event) {
      var position = marker.getPosition();
      displayLocationElevation(event.latLng, elevator, infowindow, place);
      map.setCenter(position);
      infowindow.open(map, this);
    });
  });
};

function displayLocationElevation(location, elevator, infowindow, place) {
  // Initiate the location request
  elevator.getElevationForLocations({
    'locations': [location]
  }, function(results, status) {
    infowindow.setPosition(location);
    if (status === google.maps.ElevationStatus.OK) {
      var elev = results[0]["elevation"].toString();
      infowindow.setContent("<div class='info'>" + place.name + "<br>" + place.city + "<br>" + place.description + "</div><br>" + elev);
    }
  });
};
