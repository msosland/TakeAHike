class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.float :latitude
      t.float :longitude
      t.string :city
      t.string :state
      t.string :name
      t.integer :unique_id, unique: true
      t.timestamps null: false
    end
  end
end
