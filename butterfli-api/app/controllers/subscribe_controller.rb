class SubscribeController < ApplicationController
  before_filter :verify_jwt_token
  def new 
  end 
  def update 
    # Get the credit card details submitted by the form 
    token = params[:stripeToken] 
    # Create a Customer 
    customer = Stripe::Customer.create( 
      :source => token, 
      :plan => # Your plan ID, 
      :email => current_user.email 
    ) 
    # Save stripe information to the current user using Devise     
      helper
    current_user.subscribed = true 
    current_user.stripeid = customer.id 
    current_user.save 
    # Redirect back to products page with a ‘success’ notice 
    redirect_to products_path, :notice => "Your subscription was successful!" 
  end
end
