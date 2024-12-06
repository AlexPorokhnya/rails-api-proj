Rails.application.routes.draw do

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  },defaults: { format: :json }

  namespace :api do
    namespace :v1 do
      resources :posts
    end
  end

  get '/current_user', to: 'application#current'
  delete '/logout', to: 'sessions#logout'
end
