Rails.application.routes.draw do

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  resources :dashes do
    # Controller Action Routes
    get "/scrape"  => 'dashes#scrape', path: 'scrape'
    get "/post_queue"  => 'dashes#post_queue', path: 'queue'  	
  end
  
  resources :posts, except: [:new, :edit]
  root 'dashes#index'
end
