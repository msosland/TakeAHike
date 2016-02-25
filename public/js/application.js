$(document).ready(function() {
  $('#start').on('submit', function(e) {
    e.preventDefault();
    var coords = $(this).serialize();
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?" + coords + "&key=KEY",
      type: "GET"
    }).done(function(response) {
      var latc = response["results"][0]["geometry"]["location"]["lat"];
      var longi = response["results"][0]["geometry"]["location"]["lng"];
      var cen = {lat: latc, lng: longi};
      $.ajax({
      url: "https://trailapi-trailapi.p.mashape.com/?limit=25&radius=200&lat=" + latc + "&lon=" + longi + "&q[activities_activity_type_name_eq]=hiking",
      type: "GET",
      xhrFields:
      {
        withCredentials: true
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Mashape-Key', 'KEY');
      }}).done(function(response) {
        $.post("/places", response)
        .done(function(response) {
          initMap(response, cen);
          // $('#map').show();
        })
      });
    });
  });
});

