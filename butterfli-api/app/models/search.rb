class Search < ActiveRecord::Base
	has_one :dash
	validates_uniqueness_of :term, :source => :dash_id
end
