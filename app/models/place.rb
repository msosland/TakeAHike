class Place < ActiveRecord::Base
  # Remember to create a migration!
  validates :unique_id, uniqueness: true
  has_many :trails
end
