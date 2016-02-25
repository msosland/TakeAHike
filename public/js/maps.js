
var map;

var initMap = function (places, cen) {
  var myLatLng = {lat: 41.878, lng: -87.629};


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: cen
  });

  places.forEach(function(place) {
    var marker = new google.maps.Marker({
    position: place,
    map: map,
    title: 'Hello World!'
  });
  });
};

