class DashesController < ApplicationController
  before_filter :verify_jwt_token
  before_action :set_dash, only: [:show, :update, :destroy]

  # GET /dashes
  # GET /dashes.json
  def index
    @dashes = Dash.all.where(user_id: current_user)

    render json: @dashes
  end

  # GET /dashes/1
  # GET /dashes/1.json
  def show
    render json: @dash
  end

  # POST /dashes
  # POST /dashes.json
  def create
    @dash = Dash.new(dash_params)

    if @dash.save
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




  def scrape
    @user = current_user
    @posts = @dash.posts.where(approved: nil)
    # @posts = @posts.paginate(:page => params[:page])
    render json: @posts   
  end

  def post_queue
    @posts = @dash.posts.where(approved: true).order(created_at: :desc)
    @posts = @posts.paginate(:page => params[:page])
    render json: @posts   
  end




  private

    def set_dash
      @dash = Dash.find(params[:id])
    end

    def dash_params
      params.require(:dash).permit(:title, :subreddit, :twit_consumer_key, :twit_consumer_secret, :twit_access_token, :twit_access_token_secret, :giphy_search, :twitter_pic_search, :tumblr_pic_search, :tumblr_consumer_key, :tumblr_consumer_secret, :tumblr_oauth_token, :tumblr_oauth_token_secret)
    end
end
