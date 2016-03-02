class AddUserIdToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :user_id, :integer
  end
end
