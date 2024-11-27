import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { resetCart } from "../redux/reducer/cartReducer";
import { CustomRootState } from "../redux/store";
import { NewOrderType } from "../types/apiTypes";
import { CartInitialReducer } from "../types/reducerTypes";
import { responseToast } from "../utils/feature";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PROMISE);

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { user } = useSelector((state: CustomRootState) => state.userReducer);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: CustomRootState) => state.cartReducer);

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orders: NewOrderType = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
      user: user?._id as string,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (paymentIntent?.status === "succeeded") {
      const res = await newOrder(orders);
      console.log(res);

      dispatch(resetCart());
      responseToast(res, navigate, "/orders");
    }
    setIsProcessing(false);

    if (error) {
      setIsProcessing(false);
      console.log(error);

      return toast.error(error.message || "Something Went Wrong");
    }
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
  const location = useLocation();
  const clientSecret: string | undefined = location.state;
  if (!clientSecret) return <Navigate to={"/shipping"} />;
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
