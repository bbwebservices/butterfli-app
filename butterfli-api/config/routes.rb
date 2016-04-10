Rails.application.routes.draw do
<<<<<<< HEAD
=======

  get 'subscribe/new'

>>>>>>> stripe
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
<<<<<<< HEAD

=======
  resources :subscribe
>>>>>>> stripe
  resources :dashes do
    # Controller Action Routes
      # Scrape
        get "/scrape"  => 'dashes#scrape', path: 'scraper'
        get "/scrape_for_pics" => "dashes#scrape_for_pics", path: 'pic-scrape'

      # Auth Routes
        get "/fb_oauth"  => 'dashes#fb_oauth'   
        get "/fb_set_token"  => 'dashes#fb_set_token' 

      # Queue
        get "/post_queue"  => 'dashes#post_queue', path: 'queue'    
        get "/post_to_network" => "dashes#post_to_network", path: 'post'
        get "/edit_post_body"  => 'dashes#edit_post_body', path: 'edit-post'
        get 'add_chrome_post' => 'dashes#add_chrome_post', path: 'add-post'
    # Post resource and controller actions
    resources :posts do
      get 'toggle_approve', :on => :member
      get 'toggle_disapprove', :on => :member   
    end
  end

  root 'dashes#index'
end
