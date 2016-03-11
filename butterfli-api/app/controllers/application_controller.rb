
class ApplicationController < ActionController::Base
  # We depend on our auth_token module here.
  require 'auth_token'

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session

  protected

    def cors_set_access_control_headers
      headers['Access-Control-Allow-Origin'] = 'http://localhost:4000'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'

    end

    # If this is a preflight OPTIONS request, then short-circuit the
    # request, return only the necessary headers and return an empty
    # text/plain.

    def cors_preflight_check
      if request.method == :options
        headers['Access-Control-Allow-Origin'] = 'http://localhost:4000'
        headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        headers['Access-Control-Request-Method'] = '*'
        headers['Access-Control-Allow-Headers'] = '*'
        headers['Access-Control-Max-Age'] = '1728000'
        render :text => '', :content_type => 'text/plain'
      end
    end
    ##
    # This method can be used as a before filter to protect
    # any actions by ensuring the request is transmitting a
    # valid JWT.
    def verify_jwt_token
      head :unauthorized if request.headers['Authorization'].nil? ||
          !AuthToken.valid?(request.headers['Authorization'].split(' ').last)
          user = AuthToken.valid?(request.headers['Authorization'].split(' ').last)[0]["user_id"]
          @current_user = User.find(user)
    end
      
end