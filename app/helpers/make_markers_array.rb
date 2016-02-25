def make_markers_array(places)
  coords = places.map do |place|
    hash = {lat: place[:latitude], lng: place[:longitude] }
  end
  coords
end