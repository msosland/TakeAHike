$(document).ready(function() {
  $('#start').on('submit', function(e) {
    e.preventDefault();
    var coords = $(this).serialize();
    $.get('/keys')
    .done(function(keys) {
      var goog = keys['goog']
      var trakey = keys['trakey']
      $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?" + coords + "&key=" + goog,
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
          xhr.setRequestHeader('X-Mashape-Key', trakey);
        }}).done(function(response) {
          var xyz = response;
          $.post("/places", response)
          .done(function(response) {
            initMap(response, cen);
            $('#start').animate({"margin-left": "-=4000px"}, 2000);
            $('#map').animate({opacity: 1.0, "left": "-=140%", "right": "+=140%"}, 3000);
            $('.research').animate({opacity: 1.0}, 3000);
          })
        });
      });
    });
  });

  $('.research').on('click', function() {
    $(this).animate({opacity: 0.0}, 1000);
    $('#start').animate({"margin-left": "+=4000px"}, 2000);
    $('#map').animate({opacity: 0.0, "left": "+=140%", "right": "-=140%"}, 3000);
  });
});

