class AddSinceIdToSearch < ActiveRecord::Migration
  def change
    add_column :searches, :since_id, :string
  end
end
