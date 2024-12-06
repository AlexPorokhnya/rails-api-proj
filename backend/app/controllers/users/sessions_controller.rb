# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  include ActionController::Cookies
  after_action :set_jwt_cookie, only: :create
  skip_before_action :verify_signed_out_user, only: :destroy
  respond_to :json

  def create
    super do |resource|
      # Возвращаем данные пользователя после успешного входа
      render json: {
        message: 'Logged in successfully.',
        user: {
          id: resource.id,
          email: resource.email
        }
      }, status: :ok and return
    end
  end

    def destroy
      super do
        Rails.logger.info "Token #{cookies.encrypted[:auth_token]}"
        # Удаляем токен из куки
        if cookies.encrypted[:auth_token].present?
          cookies.delete(:auth_token, secure: true, same_site: :none)
          Rails.logger.info "JWT Token removed from cookies"
        end
        #   render json: { message: "Successfully logged out" }, status: :ok
        # else
        #   render json: { error: "No active session found" }, status: :unauthorized
        # end
      end
    end

  private

  # def respond_with(resource, _opts = {})
  #   render json: {
  #     message: 'Logged in successfully.',
  #     data: resource
  #   }, status: :ok
  # end
  #
  # def respond_to_on_destroy
  #   if current_user
  #     render json: {
  #       message: "Logged out successfully"
  #     }, status: :ok
  #   else
  #     render json: {
  #       message: "Couldn't find an active session."
  #     }, status: :unauthorized
  #   end
  # end
  def respond_to_on_destroy
    if !current_user
      render json: { message: "Successfully logged out" }, status: :ok
    else
      render json: { error: "User was not logged in" }, status: :unauthorized
    end
  end

  def set_jwt_cookie
    return unless current_user

    token = Warden::JWTAuth::UserEncoder.new.call(
      current_user, :user, nil
    ).first

    Rails.logger.info "Generated JWT Token: #{token}"

    cookies.encrypted[:auth_token] = {
      value: token,
      httponly: true,
      secure: true,
      same_site: :none,
      expires: 1.hour.from_now
    }

    Rails.logger.info "Token set in cookies: #{cookies.encrypted[:auth_token]}"
  end
end
