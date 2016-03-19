class DashesController < ApplicationController
  before_filter :verify_jwt_token
  before_action :set_dash, only: [:show, :update, :destroy]
  before_action :set_dash_by_dash_id, only: [:scrape, :scrape_for_pics, :post_queue, :post_to_network, :edit_post_body, :fb_oauth]

  # GET /dashes
  # GET /dashes.json
  def index
      @dashes = Dash.all.where(user_id: current_user)
      render json: @dashes
  end
  # GET /dashes/1
  # GET /dashes/1.json
  def show
      render json: @dash, serializer: ShowDashSerializer
  end
  # POST /dashes
  # POST /dashes.json
  def create
      puts "current user", current_user.id
      @dash = Dash.new(dash_params)
      @dash.user_id = current_user.id
    if @dash.save
      puts '@dash id: ', @dash.user_id
      render json: @dash, status: :created, location: @dash
    else
      render json: @dash.errors, status: :unprocessable_entity
    end
  end
  # PATCH/PUT /dashes/1
  # PATCH/PUT /dashes/1.json
  def update
      @dash = Dash.find(params[:id])
    if @dash.update(dash_params)
      head :no_content
    else
      render json: @dash.errors, status: :unprocessable_entity
    end
  end
  # DELETE /dashes/1
  # DELETE /dashes/1.json
  def destroy
      @dash.destroy
      head :no_content
  end

#  Custom Controllers
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  # Scrape
  # - - - - - - - - - - - - - - 
    # Scraper page
  def scrape
      @user = current_user
      @posts = @dash.posts.where(approved: nil)
      render json: @posts, status: 200
  end
    # Scraper Controller Action
  def scrape_for_pics
      network = params[:network]
      search_term = params[:search_term]
      @dash.scraper(network, search_term)
      @posts = @dash.posts.where(approved: nil)
      render json: @posts, status: 200
  end



  # Queue 
  # - - - - - - - - - - - - - - 
    # Post Queue page
  def post_queue
      @posts = @dash.posts.where(approved: true).order(created_at: :desc)
      render json: @posts   
  end
    # Posting Controller Actions
  def post_to_network
      network = params[:network]
      post = params[:post_id]
      puts 'post id: ' + post.to_s
      @dash.post_content(post, network)
      redirect_to dash_post_queue_path(@dash)
  end
    # Edit post via AJAX
  def edit_post_body
      post = params[:post_id]
      body = params[:body_text]
      @dash.edit_post_body_content(post, body)
      redirect_to dash_post_queue_path(@dash)
  end



  # Auth Actions
  # - - - - - - - - - - - - - - 
    # FB - get auth url
  def fb_oauth
      redirect_uri = @dash.fb_oauth
      return redirect_uri
  end
    # FB - set token for dash
  def fb_set_token
      code = params[:code]
      @dash.fb_set_token(code)
      redirect_to dash_post_queue_path(@dash)
  end


  private

    def set_dash
      @dash = Dash.find(params[:id])
    end

    def set_dash_by_dash_id
      @dash = Dash.find(params[:dash_id])
    end

    def dash_params
      params.permit(:title, :user_id, :subreddit, :twit_consumer_key, :twit_consumer_secret, :twit_access_token, :twit_access_token_secret, :giphy_search, :twitter_pic_search, :tumblr_pic_search, :tumblr_consumer_key, :tumblr_consumer_secret, :tumblr_oauth_token, :tumblr_oauth_token_secret)
    end
end
