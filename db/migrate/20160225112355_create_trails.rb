class CreateTrails < ActiveRecord::Migration
  def change
    create_table :trails do |t|
      t.integer :place_id
      t.string :name
      t.integer :length
      t.integer :start_elevation
      t.timestamps null: false
    end
  end
end
