class AddTwitPublishedToPost < ActiveRecord::Migration
  def change
    add_column :posts, :twit_published, :integer, :default => 0
  end
end
