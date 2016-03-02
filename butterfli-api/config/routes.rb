Rails.application.routes.draw do

  resources :posts, except: [:new, :edit]
  resources :dashes, except: [:new, :edit]
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  
  root 'welcome#index'
end
