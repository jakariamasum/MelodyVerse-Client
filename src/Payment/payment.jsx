import StripeCheckout from 'react-stripe-checkout';

const Payment = () => {
    const publishableKey= 'pk_test_51NFKgXEzrlDWkzjgpZshOM6ZKUWe54LTR8tg6hhOGybv7wp7AlXkGURZr41IRZ2EOUkMdYoa2zv6qIlz2d7BqSnq003cfIN6E9';
    console.log(publishableKey)
  const handleToken = (token) => {
    // You can handle the token received from Stripe here
    console.log(token);
    // Perform any additional actions like sending the token to your server
    // for payment processing and order fulfillment
  };

  return (
    <div>
      <StripeCheckout
        stripeKey={publishableKey}
        amount={1000} // Amount in cents (e.g., 10 USD)
        currency="USD"
        name="My Store"
        description="Payment for products"
        token={handleToken}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Payment;
