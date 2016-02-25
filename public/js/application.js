$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  $('#start').on('submit', function(e) {
    e.preventDefault();
    var coords = $(this).serialize();
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?" + coords + "&key=KEY_here",
      type: "GET"
    }).done(function(response) {
      var lat = response["results"][0]["geometry"]["location"]["lat"];
      var lon = response["results"][0]["geometry"]["location"]["lng"]
      $.ajax({
      url: "https://trailapi-trailapi.p.mashape.com/?limit=25&radius=200&lat=" + lat + "&lon=" + lon,
      type: "GET",
      xhrFields:
      {
        withCredentials: true
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Mashape-Key', 'key_here');
      }}).done(function(response) {
        console.log(response);
      });
    });
  });
});
