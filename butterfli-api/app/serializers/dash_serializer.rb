class DashSerializer < ActiveModel::Serializer
  attributes :id, :title, :fb_oauth
<<<<<<< HEAD
    def fb_oauth
        app_id = object.fb_app_id
        app_secret = object.fb_app_secret
        callback_url = "http://localhost:4000/dashes/#{object.id}/fb_set_token"
        @oauth = Koala::Facebook::OAuth.new(app_id, app_secret, callback_url)
        oauth_url = @oauth.url_for_oauth_code
        puts oauth_url
        return oauth_url        
    end
=======

	def fb_oauth
	    app_id = object.fb_app_id
	    app_secret = object.fb_app_secret
	    callback_url = "http://butterfli.herokuapp.com/dashes/#{object.id}/fb_set_token"
	    @oauth = Koala::Facebook::OAuth.new(app_id, app_secret, callback_url)
	    oauth_url = @oauth.url_for_oauth_code
	    puts oauth_url
	    return oauth_url 		
	end


>>>>>>> stripe
end
