
var map;

var initMap = function (places, cen) {
  var myLatLng = {lat: 41.878, lng: -87.629};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: cen
  });

  var infowindow = new google.maps.InfoWindow();

  places.forEach(function(place) {
    var marker = new google.maps.Marker({
      position: {lat: place.latitude, lng: place.longitude},
      map: map,
      title: 'Hello World!'
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name + "<br>" + place.city + place.description + "<br><img src='" + place.thumbnail + "'>");
      infowindow.open(map, this);
    });
  });
};
