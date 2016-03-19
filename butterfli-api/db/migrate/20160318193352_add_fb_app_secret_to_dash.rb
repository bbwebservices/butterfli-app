class AddFbAppSecretToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :fb_app_secret, :string
  end
end
