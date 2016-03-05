class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :set_dash, only: [:new, :create]

  # GET /posts
  # GET /posts.json
  # def index
  #   @posts = Post.all
  #   render json: @posts
  # end

  # GET /posts/1
  # GET /posts/1.json
  # def show
  #   render json: @post
  # end

  # POST /posts
  # POST /posts.json
  def create
    @dash = Dash.find(params[:dash_id])
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      head :no_content
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  # def destroy
  #   @post.destroy
  #   head :no_content
  # end

# Custom Controller Actions

  def toggle_approve  
      @p = Post.find(params[:id])
    if @p.approved
      @p.toggle!(:approved)  
    else
      @p.approved = true
    end
      @p.save
    render :nothing => true, status: 200 
  end

  def toggle_disapprove  
      @p = Post.find(params[:id])  
    if @p.approved
      @p.toggle!(:approved)  
    else
      @p.approved = false
    end
    @p.save
    render :nothing => true, status: 200 
  end



  private
    def set_dash
      @dash = Dash.find(params[:dash_id])
    end

    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :og_source, :body, :image_src, :author, :og_id)
    end
end
