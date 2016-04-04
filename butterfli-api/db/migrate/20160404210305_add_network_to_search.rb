class AddNetworkToSearch < ActiveRecord::Migration
  def change
    add_column :searches, :network, :string
  end
end
