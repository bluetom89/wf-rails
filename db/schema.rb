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

ActiveRecord::Schema.define(version: 20150531163528) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels_user_industry_charts", id: false, force: :cascade do |t|
    t.integer "industry_chart_id", null: false
    t.integer "channel_id",        null: false
  end

  add_index "channels_user_industry_charts", ["industry_chart_id", "channel_id"], name: "industry_charts_channels_index", unique: true, using: :btree

  create_table "emails", force: :cascade do |t|
    t.string   "email",      limit: 255, null: false
    t.string   "name",       limit: 255
    t.string   "source",     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "emails", ["email"], name: "index_emails_on_email", unique: true, using: :btree

  create_table "facebook_accounts", force: :cascade do |t|
    t.string   "email",       limit: 255
    t.string   "name",        limit: 255
    t.string   "first_name",  limit: 255
    t.string   "last_name",   limit: 255
    t.string   "image",       limit: 255
    t.string   "description", limit: 500
    t.string   "link",        limit: 255
    t.string   "hometown",    limit: 255
    t.string   "location",    limit: 255
    t.string   "bio",         limit: 500
    t.string   "quotes",      limit: 255
    t.string   "gender",      limit: 255
    t.string   "locale",      limit: 255
    t.string   "guid",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "token",       limit: 255
    t.string   "category",    limit: 255
  end

  create_table "facebook_accounts_users", force: :cascade do |t|
    t.integer "facebook_account_id"
    t.integer "user_id"
  end

  create_table "google_accounts", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "uid",                     limit: 255
    t.string   "name",                    limit: 255
    t.string   "email",                   limit: 255
    t.string   "first_name",              limit: 255
    t.string   "last_name",               limit: 255
    t.string   "image",                   limit: 255
    t.date     "birthday"
    t.string   "locale",                  limit: 255
    t.datetime "expires_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "token_encrypted",         limit: 255
    t.string   "token_iv",                limit: 255
    t.string   "refresh_token_encrypted", limit: 255
    t.string   "refresh_token_iv",        limit: 255
    t.string   "error_msg",               limit: 255
    t.string   "channel_id"
  end

  create_table "google_accounts_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "google_account_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "google_accounts_users", ["google_account_id"], name: "index_google_accounts_users_on_google_account_id", using: :btree
  add_index "google_accounts_users", ["user_id"], name: "index_google_accounts_users_on_user_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "email",      limit: 255
    t.string   "subject",    limit: 255
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name",          limit: 255
    t.integer  "resource_id"
    t.string   "resource_type", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "twitter_accounts", force: :cascade do |t|
    t.string   "uid",         limit: 255
    t.string   "nickname",    limit: 255
    t.string   "name",        limit: 255
    t.string   "location",    limit: 255
    t.string   "image",       limit: 255
    t.string   "description", limit: 255
    t.string   "website",     limit: 255
    t.string   "twitter",     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "token",       limit: 255
    t.string   "secret",      limit: 255
    t.datetime "limit_block"
  end

  create_table "twitter_accounts_users", force: :cascade do |t|
    t.integer "twitter_account_id"
    t.integer "user_id"
  end

  create_table "user_industry_charts", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "slug",        limit: 255
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "channel_ids"
  end

  add_index "user_industry_charts", ["user_id"], name: "index_user_industry_charts_on_user_id", using: :btree

  create_table "user_playlists", force: :cascade do |t|
    t.string   "name",       limit: 255,                 null: false
    t.boolean  "public",                 default: false
    t.text     "video_ids",                              null: false
    t.integer  "user_id",                                null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug",       limit: 255
  end

  add_index "user_playlists", ["slug"], name: "index_user_playlists_on_slug", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                           limit: 255, default: "",    null: false
    t.string   "encrypted_password",              limit: 255, default: ""
    t.string   "reset_password_token",            limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                               default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",              limit: 255
    t.string   "last_sign_in_ip",                 limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name",                            limit: 255
    t.string   "confirmation_token",              limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",               limit: 255
    t.boolean  "subscribe_important_site_update",             default: false
    t.boolean  "subscribe_newsletter",                        default: false
    t.boolean  "subscribe_account_notification",              default: false
    t.datetime "sended_email"
    t.string   "credit_card_id",                  limit: 255
    t.string   "credit_card_description",         limit: 255
    t.string   "invitation_token",                limit: 255
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.integer  "invited_by_id"
    t.string   "invited_by_type",                 limit: 255
    t.string   "payment_user_id",                 limit: 255, default: "",    null: false
    t.integer  "untrack_channel_count",                       default: 0
    t.string   "slug",                            limit: 255
    t.string   "channel_tracked_ids",                         default: [],                 array: true
    t.string   "channel_owned_ids",                           default: [],                 array: true
    t.string   "video_tracked_ids",                           default: [],                 array: true
    t.boolean  "skip_google_account",                         default: false
    t.string   "channel_category_ids",                        default: [],                 array: true
    t.string   "subscription_email"
    t.string   "subscription_name"
  end

  add_index "users", ["channel_category_ids"], name: "index_users_on_channel_category_ids", using: :gin
  add_index "users", ["channel_owned_ids"], name: "index_users_on_channel_owned_ids", using: :gin
  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["invitation_token"], name: "index_users_on_invitation_token", unique: true, using: :btree
  add_index "users", ["invited_by_id"], name: "index_users_on_invited_by_id", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["slug"], name: "index_users_on_slug", unique: true, using: :btree

  create_table "users_packages", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.text     "details"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

end
