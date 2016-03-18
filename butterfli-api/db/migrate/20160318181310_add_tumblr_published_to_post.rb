class AddTumblrPublishedToPost < ActiveRecord::Migration
  def change
    add_column :posts, :tumblr_published, :integer, :default => 0
  end
end
