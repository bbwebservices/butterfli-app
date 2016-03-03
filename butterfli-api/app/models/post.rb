class Post < ActiveRecord::Base
	has_one :dash
	validates_uniqueness_of :og_source, :source => :dash_id
end
