post '/places' do
  places = parse_response(params)
  # @markers = make_markers_array(places)
  @places = places.map {|place| Place.find_or_create_by!(place)}
  content_type :json
  @places.to_json
end

get '/keys' do
  content_type :json
  {goog: ENV['GOOG1'], trakey: ENV['TRAKEY']}.to_json
end