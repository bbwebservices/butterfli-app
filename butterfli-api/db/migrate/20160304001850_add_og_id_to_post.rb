class AddOgIdToPost < ActiveRecord::Migration
  def change
    add_column :posts, :og_id, :string
  end
end
