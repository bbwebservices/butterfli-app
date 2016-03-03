class AddTumblrBlogNameToDash < ActiveRecord::Migration
  def change
    add_column :dashes, :tumblr_blog_name, :string
  end
end
