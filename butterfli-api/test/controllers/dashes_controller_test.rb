require 'test_helper'

class DashesControllerTest < ActionController::TestCase
  setup do
    @dash = dashes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dashes)
  end

  test "should create dash" do
    assert_difference('Dash.count') do
      post :create, dash: { giphy_search: @dash.giphy_search, subreddit: @dash.subreddit, title: @dash.title, tumblr_consumer_key: @dash.tumblr_consumer_key, tumblr_consumer_secret: @dash.tumblr_consumer_secret, tumblr_oauth_token: @dash.tumblr_oauth_token, tumblr_oauth_token_secret: @dash.tumblr_oauth_token_secret, tumblr_pic_search: @dash.tumblr_pic_search, twit_access_token: @dash.twit_access_token, twit_access_token_secret: @dash.twit_access_token_secret, twit_consumer_key: @dash.twit_consumer_key, twit_consumer_secret: @dash.twit_consumer_secret, twitter_pic_search: @dash.twitter_pic_search }
    end

    assert_response 201
  end

  test "should show dash" do
    get :show, id: @dash
    assert_response :success
  end

  test "should update dash" do
    put :update, id: @dash, dash: { giphy_search: @dash.giphy_search, subreddit: @dash.subreddit, title: @dash.title, tumblr_consumer_key: @dash.tumblr_consumer_key, tumblr_consumer_secret: @dash.tumblr_consumer_secret, tumblr_oauth_token: @dash.tumblr_oauth_token, tumblr_oauth_token_secret: @dash.tumblr_oauth_token_secret, tumblr_pic_search: @dash.tumblr_pic_search, twit_access_token: @dash.twit_access_token, twit_access_token_secret: @dash.twit_access_token_secret, twit_consumer_key: @dash.twit_consumer_key, twit_consumer_secret: @dash.twit_consumer_secret, twitter_pic_search: @dash.twitter_pic_search }
    assert_response 204
  end

  test "should destroy dash" do
    assert_difference('Dash.count', -1) do
      delete :destroy, id: @dash
    end

    assert_response 204
  end
end
