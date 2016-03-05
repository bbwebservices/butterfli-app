# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160304001850) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dashes", force: :cascade do |t|
    t.string   "title"
    t.string   "subreddit"
    t.string   "twit_consumer_key"
    t.string   "twit_consumer_secret"
    t.string   "twit_access_token"
    t.string   "twit_access_token_secret"
    t.string   "giphy_search"
    t.string   "twitter_pic_search"
    t.string   "tumblr_pic_search"
    t.string   "tumblr_consumer_key"
    t.string   "tumblr_consumer_secret"
    t.string   "tumblr_oauth_token"
    t.string   "tumblr_oauth_token_secret"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "user_id"
    t.string   "tumblr_blog_name"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.string   "og_source"
    t.string   "body"
    t.string   "image_src"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "dash_id"
    t.boolean  "approved"
    t.string   "author"
    t.string   "og_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
