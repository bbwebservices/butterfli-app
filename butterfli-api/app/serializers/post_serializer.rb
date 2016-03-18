class PostSerializer < ActiveModel::Serializer
  attributes :title, :og_source, :body, :image_src, :author, :id, :twit_published, :tumblr_published
end
