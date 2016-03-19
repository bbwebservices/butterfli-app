class AddFbAppIdToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :fb_app_id, :string
  end
end
