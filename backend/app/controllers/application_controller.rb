class ApplicationController < ActionController::API
  include ActionController::Cookies

  # before_action :current, only: %i[destroy update]W
  def current
    # Извлекаем токен из cookies
    token = cookies.encrypted[:auth_token]
    puts "Token: #{token}"
    Rails.logger.info "SECRET_KEY_BASE: #{Rails.application.secrets.secret_key_base}"

    if token.blank?
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end

    # Декодируем токен
    begin
      payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
      Rails.logger.info "Decoded payload: #{payload}"
      @current_user = User.find(payload['sub']) # Извлекаем пользователя по ID (sub)
      render json: @current_user, status: :ok
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      Rails.logger.error "Authentication error: #{e.message}"
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

end
