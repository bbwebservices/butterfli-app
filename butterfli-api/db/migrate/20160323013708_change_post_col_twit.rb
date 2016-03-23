class ChangePostColTwit < ActiveRecord::Migration
  def self.up
    change_table :posts do |t|
      t.change :twit_published, :string, default: ''
    end
  end
  def self.down
    change_table :posts do |t|
      t.change :twit_published, :integer
    end
  end
end
