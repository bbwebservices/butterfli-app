class CreateDashes < ActiveRecord::Migration
  def change
    create_table :dashes do |t|
      t.string :title
      t.string :subreddit
      t.string :twit_consumer_key
      t.string :twit_consumer_secret
      t.string :twit_access_token
      t.string :twit_access_token_secret
      t.string :giphy_search
      t.string :twitter_pic_search
      t.string :tumblr_pic_search
      t.string :tumblr_consumer_key
      t.string :tumblr_consumer_secret
      t.string :tumblr_oauth_token
      t.string :tumblr_oauth_token_secret

      t.timestamps null: false
    end
  end
end
