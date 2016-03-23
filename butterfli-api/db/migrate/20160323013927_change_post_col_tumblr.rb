class ChangePostColTumblr < ActiveRecord::Migration
  def self.up
    change_table :posts do |t|
      t.change :tumblr_published, :string, default: ''
    end
  end
  def self.down
    change_table :posts do |t|
      t.change :tumblr_published, :integer
    end
  end
end
