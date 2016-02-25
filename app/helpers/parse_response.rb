def parse_response(params)
  places = params["places"]
  objects = places.map do |index, place|
    hash = {city: place["city"],
      state: place["state"],
      name: place["name"],
      latitude: place["lat"].to_f,
      longitude: place["lon"].to_f,
      unique_id: place["unique_id"].to_i}
  end
  objects
end