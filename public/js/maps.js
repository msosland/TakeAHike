
var map;

var initMap = function (places, cen) {
  var myLatLng = {lat: 41.878, lng: -87.629};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: cen
  });

  var elevator = new google.maps.ElevationService();

  var infowindow = new google.maps.InfoWindow();
  var image = 'http://i.imgur.com/rMlg3Cl.png'
  places.forEach(function(place) {
    var marker = new google.maps.Marker({
      position: {lat: place.latitude, lng: place.longitude},
      map: map,
      icon: image
    });
    google.maps.event.addListener(marker, 'click', function(event) {
      var position = marker.getPosition();
      displayLocationElevation(event.latLng, elevator, infowindow, place);
      map.setCenter(position);
      infowindow.open(map, this);
    });
  });
  google.maps.event.addListener(infowindow, 'domready', function() {

   // Reference to the DIV which receives the contents of the infowindow using jQuery
   var iwOuter = $('.gm-style-iw');

   /* The DIV we want to change is above the .gm-style-iw DIV.
    * So, we use jQuery and create a iwBackground variable,
    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
    */
   var iwBackground = iwOuter.prev();

   // Remove the background shadow DIV
   iwBackground.children(':nth-child(2)').css({'display' : 'none'});

   // Remove the white background DIV
   iwBackground.children(':nth-child(4)').css({'display' : 'none'});

});
};

function displayLocationElevation(location, elevator, infowindow, place) {
  // Initiate the location request
  elevator.getElevationForLocations({
    'locations': [location]
  }, function(results, status) {
    infowindow.setPosition(location);
    if (status === google.maps.ElevationStatus.OK) {
      var elev = results[0]["elevation"].toFixed(2).toString();
      infowindow.setContent("<div id='iw-container' class='info'><header class='iw-title'>" + place.name + "</header><br><strong>" + place.city + ", " + place.state + "</strong><br>Starting Elevation: " + elev + " metres<br><br>" + place.description + "</div>");
    }
  });
};
