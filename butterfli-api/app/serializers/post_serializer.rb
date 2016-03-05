class PostSerializer < ActiveModel::Serializer
  attributes :title, :og_source, :body, :image_src, :author
end
