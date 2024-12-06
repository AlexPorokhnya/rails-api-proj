# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  include ActionController::Cookies
  respond_to :json


  def create
    super do |resource|
      if resource.persisted?
        set_jwt_cookie(resource)
      end
    end
  end
  private

  # def respond_with(resource, _opts = {})
  #   if request.method == "POST" && resource.persisted?
  #     render json: {
  #       status: {message: "Signed up successfully."},
  #       data: resource
  #     }, status: :ok
  #   elsif request.method == "DELETE"
  #     render json: {
  #       status: {message: "Account deleted successfully."}
  #     }, status: :ok
  #   else
  #     render json: {
  #       message: "User couldn't be created successfully.",
  #       errors: resource.errors.full_messages.to_sentence
  #     }, status: :unprocessable_entity
  #   end
  # end
  def set_jwt_cookie(user)

    token = Warden::JWTAuth::UserEncoder.new.call(
      user, :user, nil
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
