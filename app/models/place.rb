class Place < ActiveRecord::Base
  # Remember to create a migration!
  has_many :trails
end
