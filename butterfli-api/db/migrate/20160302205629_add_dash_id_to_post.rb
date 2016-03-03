class AddDashIdToPost < ActiveRecord::Migration
  def change
    add_column :posts, :dash_id, :integer
  end
end
