import StripeCheckout from 'react-stripe-checkout';

const payment = () => {

    const paymentKey= import.meta.env.PAYMENT_KEY
    const payNow=()=>{
        console.log(paymentKey)
    }
    return (
        <div>
            <h1>give money 10</h1>
            <StripeCheckout
            stripeKey={paymentKey}
            label='Pay Now'
            name='Pay with Credit Card'
            amount={10}
            description='Your total amount 10'
            token={payNow}
            />
        </div>
        
    );
};

export default payment;