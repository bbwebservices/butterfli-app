class Dash < ActiveRecord::Base
	belongs_to :user
	has_many :posts


	def giphy_scrape(search)
		begin
			search = search ? search : self.giphy_search
			sanitize = search.tr(" ", "+");
			key = "dc6zaTOxFJmzC"
			url = "http://api.giphy.com/v1/gifs/search?q=" + sanitize + "&api_key=" + key
			resp = Net::HTTP.get_response(URI.parse(url))
			buffer = resp.body
			result = JSON.parse(buffer)
			puts "results: ", result['data']
			temp = []
			result['data'].each do |x|
				puts x
				temp.push(x["images"]["fixed_height"]["url"])
			end	
			temp.each do |post|
				self.build_post("giphy", post, nil, post, post)
			end
			return temp 
		rescue
			return nil
		end
	end
	def reddit_pic_scrape(sub)
		subredd = sub ? sub : self.subreddit
		reddit_api_url = "https://www.reddit.com/r/"+ subredd +".json"
		resp = Net::HTTP.get_response(URI.parse(reddit_api_url))
		data = resp.body
		result = JSON.parse(data)
		result["data"]["children"].each do |post|
			begin
				self.build_post("reddit", post["data"]["preview"]["images"].first["source"]["url"], post["data"]["title"], post["data"]["preview"]["images"].first["source"]["url"], post["data"]["preview"]["images"].first["source"])
			rescue
				puts "nope"
			end
		end
	end	
	def twitter_pic_scrape(search)
		t = self.get_twit_client
		search_var = search
		pic_limit = 0
		t.search(search_var, result_type: "recent").collect do |tweet|
			unless tweet.media[0].nil?
				pic_limit += 1
				if pic_limit < 25 
					img = tweet.media[0].media_url
					self.build_post("twitter", img, tweet.text, img, img)
				end
			end
		end	 		
	end

	def tumblr_pic_scrape(search)
		tum = self.get_tumblr_client
		client = Tumblr::Client.new
		img = client.posts(search + ".tumblr.com", :type => "photo", :limit => 50)["posts"]
		begin
			img.each do |post|
				author = post["post_author"]
				message = post["summary"]
				extracted_img = post['photos'][0]['alt_sizes'][0]['url']
				self.build_post("tumblr", extracted_img, message, extracted_img, author)
			end
		rescue
			puts "nope. tumblr_pic_scrape failed."
		end
	end

	# Auth Methods
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

	#Build Methods

	def build_post(title, src, body, image, author)
		p = self.posts.build(title: title, og_source: src, body: body, image_src: image, author: author)		
		p.save
	end
end
