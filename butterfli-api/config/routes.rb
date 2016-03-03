Rails.application.routes.draw do

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  resources :dashes do
    # Controller Action Routes
      # Scrape
        get "/scrape"  => 'dashes#scrape', path: 'scraper'
        get "/scrape_for_pics" => "dashes#scrape_for_pics", path: 'pic-scrape'

      # Queue
        get "/post_queue"  => 'dashes#post_queue', path: 'queue'  	
        get "/post_to_network" => "dashes#post_to_network", path: 'post'

    # Post resource and controller actions
    resources :posts do
      get 'toggle_approve', :on => :member   
      get 'toggle_disapprove', :on => :member   
    end
  end

  root 'dashes#index'
end
