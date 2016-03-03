class ShowDashSerializer < ActiveModel::Serializer
  attributes :id, :title, :approved_posts, :null_posts

  def approved_posts
  	@posts = Post.all.where(approved: true).take(20)
  end
  def null_posts
  	@posts = Post.all.where(approved: nil).take(20)
  end
end
