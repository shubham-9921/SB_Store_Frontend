import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeFormCart,
} from "../redux/reducer/cartReducer";
import { CartInitialReducer } from "../types/reducerTypes";
import { CartItemsType } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const [coupon, setCoupon] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { cartItems, total, subtotal, tax, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartInitialReducer }) => state.cartReducer
    );

  const incrementHandler = (cartItem: CartItemsType) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItemsType) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeFormCart(productId));
  };

  useEffect(() => {
    const timeOutd = setTimeout(() => {
      const { token } = axios.CancelToken.source();

      axios
        .get(`${server}/api/v1/payment/coupon/discount?couponCode=${coupon}`, {
          cancelToken: token,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          dispatch(calculatePrice());
          setIsValid(true);
        })
        .catch(() => {
          dispatch(discountApplied(0));
          dispatch(calculatePrice());
          setIsValid(false);
        });
    }, 1000);
    return () => {
      clearTimeout(timeOutd);

      setIsValid(false);
    };
  }, [coupon]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItem
              key={idx}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              cartItem={i}
            ></CartItem>
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal :₹{subtotal}</p>
        <p>Shipping Chargers :₹{shippingCharges}</p>
        <p>Tax :₹{tax}</p>

        <p className="">
          Discount : <em> - ₹{discount}</em>
        </p>
        <p>
          <b>Total : ₹{total}</b>
        </p>

        <input
          type="text"
          value={coupon}
          placeholder="Coupon code"
          onChange={(e) => setCoupon(e.target.value)}
        />

        {coupon &&
          (isValid ? (
            <span className="green">
              ₹{discount} off using <code>{coupon}</code>{" "}
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to={"/shipping"}> Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
