post '/places' do
  places = parse_response(params)
  @places = places.map {|place| Place.find_or_create_by!(place)}
  erb :'places/index'
end