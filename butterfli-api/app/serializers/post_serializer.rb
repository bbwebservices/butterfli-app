class PostSerializer < ActiveModel::Serializer
  attributes :dash, :title, :og_source, :body, :image_src, :author
end
