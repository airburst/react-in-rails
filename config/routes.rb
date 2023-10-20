Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  get 'qcp', to: 'qcp#index'
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "hello_world#index"
end
