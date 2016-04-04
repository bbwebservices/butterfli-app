class Search < ActiveRecord::Base
	has_one :dash
	validates_uniqueness_of :term, :scope => [:dash_id, :network]
end
