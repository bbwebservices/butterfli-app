class Dash < ActiveRecord::Base
	belongs_to :user
	has_many :posts
	has_many :searches


# Scraper Methods
# - - - - - - - - - - - - - - - - - - - - -
	def scraper(search, parameters)
		puts 'hello! from scraper'
		if self.searches.where(term: search.to_s, network: parameters[0]) != []
			puts 'this already exists!'
			search_obj = self.searches.where(term: search.to_s).first
		elsif self.searches.where(term: search.to_s, network: parameters[0]) == []
			search_obj = Search.new(term: search, network: parameters[0])
			self.searches << search_obj
			puts 'made obj!'
		end


	    unless !parameters[0] && !search
	      case search_obj.network
		      when 'twitter'
		      	ps = ["popular","en", 'images']
		        self.twitter_pic_scrape(search_obj, ps)
		      when 'giphy'
				sub_params = parameters[1]
		        self.giphy_scrape(search, sub_params)
		      when 'tumblr'
		        self.tumblr_pic_scrape(search)
		      when 'reddit'
		        self.reddit_pic_scrape(search)
	      end
	    end		
	end

	def giphy_scrape(search, parameters)
		begin
		    self.giphy_search = search.downcase
		    self.save
			search = search ? search : self.giphy_search
			sanitize = search.tr(" ", "+");
			key = "dc6zaTOxFJmzC"
			type = parameters[0]
			method = parameters[1]
			url = self.giphy_search_controller(type, method, sanitize, key)
			resp = Net::HTTP.get_response(URI.parse(url))
			buffer = resp.body
			result = JSON.parse(buffer)
			temp = []

			# decided between multiple or singular gifs
			if method == 'search'
				result['data'].each do |x|
					temp.push(x["images"]["fixed_height"]["url"])
				end	
			elsif method == 'translate' || method == 'random'
				temp.push(result['data']["images"]['fixed_height']['url']);
			end
			temp.each do |post|
				self.build_post("giphy", post, nil, post, "giphy", post)
			end
			return temp 
		rescue
			return nil
		end
	end
	def giphy_search_controller(type, method, sanitize, key)
		puts 'giphy serach cronller has fired'
		if method == 'search'
			return url = "http://api.giphy.com/v1/"+type+"/search?q=" + sanitize + "&api_key=" + key
		elsif method == 'translate'
			return url = "http://api.giphy.com/v1/"+type+"/translate?s=" + sanitize + "&api_key=" + key
		elsif method == 'random'
			return url = "http://api.giphy.com/v1/"+type+"/random?api_key=" + key + '&tag=' + sanitize 
		end
	end	
	def reddit_pic_scrape(sub)
	    self.subreddit = sub.downcase
	    # term_arr = search_term.split(",")
	    self.save
		subredd = sub ? sub : self.subreddit
		reddit_api_url = "https://www.reddit.com/r/"+ subredd +".json"
		resp = Net::HTTP.get_response(URI.parse(reddit_api_url))
		data = resp.body
		result = JSON.parse(data)
		count = 0
		result["data"]["children"].each do |post|
			# puts post.to_json
			begin
				puts post["data"]["preview"]["images"].first["source"]["url"]
				puts post["data"]["title"]
				self.build_post("reddit", post["data"]["preview"]["images"].first["source"]["url"], post["data"]["title"], post["data"]["preview"]["images"].first["source"]["url"], post["data"]["preview"]["images"].first["source"], post["data"]["preview"]["images"].first["source"]["url"])
				count += 1
			rescue
				puts "nope"
			end
		end
		return count
	end	
	# result_type: 'popular', max_id: '', lang: 'en',   filter: 'twimg'
	def twitter_pic_scrape(search_obj, parameters)
	    self.twitter_pic_search = search_obj.term.downcase
	    puts "encoded: ", URI::encode(self.twitter_pic_search)
	    self.save		
	    result_type = parameters[0]
		t = self.get_twit_client
		search_var = search_obj.term + " -rt"
		pic_limit = 0
		pic_fail = 0
		count = 0
		if !search_obj.since_id
			max_id = ''
			puts 'max_id: ', max_id 
		else
			max_id = search_obj.since_id
			puts 'max_id: ', max_id 
		end
		t.search(search_var, options = {result_type: result_type, max_id: max_id, lang: 'en',   filter: 'twimg'}).collect do |tweet|
			puts 'tweet', tweet.to_json
			puts 'index', count
			count += 1
			unless tweet.media[0].nil?
				puts 'url', tweet.media[0].media_url
				if pic_limit < 25
					img = tweet.media[0].media_url
					post_build = self.build_post("twitter", img, tweet.text, img, img, tweet.id)
					puts 'post build: ' + post_build.to_s 
					if post_build
						puts 'pic count: ' + pic_limit.to_s
						pic_limit += 1
					else
						pic_fail += 1
					end
					search_obj.since_id = tweet.id.to_s
					puts "trying this: " + search_obj.since_id
					search_obj.save
					puts 'saved!!   ~~ !@!!'
				else
					puts 'breakin out!'
					break
				end
					puts 'we skipped ' + pic_fail.to_s + ' pics that youve already seen. '
					puts 'searched ' + count.to_s + ' tweets and found ' + pic_limit.to_s + ' pics for ya!'

					if pic_limit == 0
						puts 'you should try and diversify your search! nothing to see here..'
					end
			end
		end	 		
	end
	def tumblr_pic_scrape(search)
		
		sanitize = search.tr(" ", "+");
		tum = self.get_tumblr_client
		client = Tumblr::Client.new
		puts 'string sanitized: ', sanitize
		img = client.tagged(sanitize)
		begin
			img.each do |post|
				puts post
				og_id = post["id"]
				author = post["post_author"]
				message = post["summary"]
				extracted_img = post['photos'][0]['alt_sizes'][0]['url']
				self.build_post("tumblr", extracted_img, message, extracted_img, author, og_id)
			end
		rescue
			puts "nope. tumblr_pic_scrape failed."
		end
	end

	def tumblr_blog_scrape(blog)
		tum = self.get_tumblr_client
		client = Tumblr::Client.new
		img = client.posts(blog + ".tumblr.com", :type => "photo", :limit => 50)["posts"]
		begin
			img.each do |post|
				puts post
				og_id = post["id"]
				author = post["post_author"]
				message = post["summary"]
				extracted_img = post['photos'][0]['alt_sizes'][0]['url']
				self.build_post("tumblr", extracted_img, message, extracted_img, author, og_id)
			end
		rescue
			puts "nope. tumblr_pic_scrape failed."
		end
	end



# Posting Methods
# - - - - - - - - - - - - - - - - - - - - -
	def post_tweet(post)
		twitCli = self.get_twit_client
		post = Post.find(post)
		puts post
		begin
			img = open(post.og_source)
			puts img
			if img.is_a?(StringIO)
			  ext = File.extname(url)
			  name = File.basename(url, ext)
			  Tempfile.new([name, ext])
			else
			  img
			end		
			body = post.body.to_s
			body_short = self.shorten(body, 90)
			res = twitCli.update_with_media(body_short, img)
			post.twit_published =  res.id.to_s
			post.save
		rescue => e
			puts e
			return 'tried'
		end
	end
	def post_tumblr(post)
		tumblr_client = self.get_tumblr_client
		@post = Post.find(post)
		@client = Tumblr::Client.new
		puts @client
		begin
			url = @post.og_source

			img = URI.parse(@post.image_src)
			puts img
			blog_name = self.tumblr_blog_name
			uri = blog_name + ".tumblr.com"
			res = @client.photo(uri, caption: @post.body, source: img)
			puts res
			if res["status"] == 401
				return 'tried'
			end
			@post.tumblr_published == res.id.to_s
			@post.save
		rescue
			return 'tried'
		end
	end
	def post_content(post, network)
	    if !post
	      post = Post.all.where(dash_id: self.id, approved: true).shuffle.first.id      
	    end
	    case network
	    when 'twitter'
	    	self.post_tweet(post)
	    when 'tumblr'
	    	self.post_tumblr(post)
    	end
	end

	# Edit post body content
	def edit_post_body_content(post, body)
    	@post = Post.find(post)
    	@post.body = body
    	@post.save
	end




# Favorite Methods
# - - - - - - - - - - - - - - - - - - - - -	

	def like_content(network, post)
		network = post['title'].to_s
    	post_id = post.og_id
	    case network
	    when 'twitter'
	    	@client = self.get_twit_client
	    	@client.favorite(post_id)
	    when 'tumblr'
	    	@client = self.get_tumblr_client
	    	@client.favorite(post_id)
	    end
	end	


#Build Methods	
# - - - - - - - - - - - - - - - - - - - - -
	def build_post(title, src, body, image, author, og_id)
		p = self.posts.build(title: title, og_source: src, body: body, image_src: image, author: author, og_id: og_id)		
		p.save
		if p.save
			puts 'post saved!'
			return true
		else
			puts 'post didnt save!'
			return false
		end
	end




# Auth Methods
# - - - - - - - - - - - - - - - - - - - - -	
	def get_twit_client
		twitCli = Twitter::REST::Client.new do |config|
		  config.consumer_key        = self.twit_consumer_key
		  config.consumer_secret     = self.twit_consumer_secret
		  config.access_token        = self.twit_access_token
		  config.access_token_secret = self.twit_access_token_secret
		end
		return twitCli
	end
	def get_tumblr_client
		tumblr = Tumblr.configure do |config|
			  config.consumer_key = self.tumblr_consumer_key
			  config.consumer_secret = self.tumblr_consumer_secret
			  config.oauth_token = self.tumblr_oauth_token
			  config.oauth_token_secret = self.tumblr_oauth_token_secret
			end
		return tumblr
	end
	def get_postmark_client
		@postmark_client = Postmark::ApiClient.new(ENV['POSTMARK_API_KEY'])
		return @postmark_client
	end
	def fb_oauth
	    app_id = self.fb_app_id
	    app_secret = self.fb_app_secret
	    callback_url = "http://localhost:4000/dashes/#{self.id}/fb_set_token"
	    @oauth = Koala::Facebook::OAuth.new(app_id, app_secret, callback_url)
	    oauth_url = @oauth.url_for_oauth_code
	    puts oauth_url
	    return oauth_url 		
	end
	def fb_set_token(code)
	    app_id = self.fb_app_id
	    app_secret = self.fb_app_secret
	    callback_url = "http://localhost:4000/dashes/#{self.id}/fb_set_token"
	    @oauth = Koala::Facebook::OAuth.new(app_id, app_secret, callback_url)
		access_token = @oauth.get_access_token(code)
		self.fb_oauth_access_token = access_token
		self.save
	end



# UTIL
# - - - - - - - - - - - - - - - - - - - - -
	def shorten(body, len)
		puts 'Shortening!'
		puts body.length
		if body.length > len.to_i
			len = len.to_i - 3
			body = body.slice(0, len.to_i)
			body += "..."
			puts body
		end
		return body
	end

	def limiter(network)
		
	end

	
end
# - - - - - - - - - - - - - - - - - - - - -