import StripeCheckout from 'react-stripe-checkout';

const Payment = () => {
    const paymentKey= import.meta.env.SECRET_KEY;
    console.log(paymentKey)
  const handleToken = (token) => {
    // You can handle the token received from Stripe here
    console.log(token);
    // Perform any additional actions like sending the token to your server
    // for payment processing and order fulfillment
  };

  return (
    <div>
      <StripeCheckout
        token={handleToken}
        stripeKey={paymentKey}
        amount={1000} // Amount in cents (e.g., 10 USD)
        currency="USD"
        name="My Store"
        description="Payment for products"
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Payment;
