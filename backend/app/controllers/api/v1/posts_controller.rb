module Api
  module V1
    class PostsController < ApplicationController

      include ActionController::Cookies

      before_action :authenticate_user!, only: %i[create update destroy]
      before_action :set_post, only: %i[show update destroy]
      before_action :authorize_admin, only: %i[update destroy]

      def index
        @posts = Post.joins(:user).select('posts.*, users.email AS email')
        render json: @posts.map{ |post| post.attributes.merge(email: post.email) }
      end

      def create
        @post = Post.new posts_params.merge(user_id: current_user.id)

        if @post.save
          render json: {message: 'Successfully created new post', data: @post}
        else
          render json: {message: 'Error creating new post', data: @post.errors},status: :unprocessable_entity
        end
      end

      def show
        if @post
          render json: { message: 'Successfully retrieved post', data: @post }
        else
          render json: {message: 'Post not found', data: nil}
        end
      end

      def update
        if @post.update posts_params
          render json: {message: 'Successfully updated post', data: @post}
        else
          render json: {message: 'Error updating post', data: @post.errors}
        end
      end

      def destroy
        if @post.destroy
          head :no_content
        else
          render json: {message: 'Error deleting post', data: @post.errors}
        end
      end

      private

      def authorize_admin
        unless current_user.id == @post.user_id
          render json: {message: 'Forbidden action', data: nil}
        end
      end
      def posts_params
        params.require(:post).permit(:title, :body)
      end

      def set_post
        @post = Post.find(params[:id])
      end
      def authenticate_user!
        token = cookies.encrypted[:auth_token]
        puts "Token: #{token}"
        Rails.logger.info "SECRET_KEY_BASE: #{Rails.application.secrets.secret_key_base}"

        if token.blank?
          render json: { error: 'Unauthorized' }, status: :unauthorized
          return
        end

        begin
          payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
          Rails.logger.info "Decoded payload: #{payload}"
          @current_user = User.find(payload['sub'])
        rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
          Rails.logger.error "Authentication error: #{e.message}"
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end
    end
  end
end