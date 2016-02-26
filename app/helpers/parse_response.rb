def parse_response(params)
  places = params["places"]
  objects = places.map do |index, place|
    hash = {city: place["city"],
      state: place["state"],
      name: place["name"],
      latitude: place["lat"].to_f,
      longitude: place["lon"].to_f,
      unique_id: place["unique_id"].to_i}
      if place["activities"]["0"]
        hash[:description] = place["activities"]["0"]["description"]
      else
        hash[:description] = "Bueno?"
      end
      if place["activities"]["0"]["thumbnail"]
        hash[:thumbnail] = place["activities"]["0"]["thumbnail"]
      else
        hash[:thumbnail] = "http://images.tripleblaze.com/2009/08/East-Bank-0.jpg"
      end
      hash
  end
  objects
end