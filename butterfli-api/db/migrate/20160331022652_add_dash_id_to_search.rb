class AddDashIdToSearch < ActiveRecord::Migration
  def change
    add_column :searches, :dash_id, :integer
  end
end
