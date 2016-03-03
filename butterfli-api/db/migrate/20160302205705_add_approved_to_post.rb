class AddApprovedToPost < ActiveRecord::Migration
  def change
    add_column :posts, :approved, :boolean
  end
end
