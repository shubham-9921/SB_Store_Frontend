import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NmzY3SFIna1NcDeEYJW6h9dNmlonDIGiui7GfFFRGwOOHhH2AOfOvUCf0UcHxlvyEegAyjqTTbnB3jfsmTjPBME00tM32Jdsd"
);

const options = {
  // passing the client secret obtained from the server
  clientSecret: "pi_3QP4MzSFIna1NcDe1xoTtHfP_secret_rtMwYwRDPxgvHaKpkRv82fACP",
};

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      console.log(error);

      return toast.error(error.message || "Something Went Wrong");
    }

    if (paymentIntent.status === "succeeded") {
      console.log("Placing Order");
      navigate("/orders");
    }
    setIsProcessing(false);
  };
  return (
    <>
      <div className="checkoutContainer">
        <form onSubmit={submitHandler}>
          <PaymentElement />
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
