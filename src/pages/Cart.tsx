import React, { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: 1,
    photo:
      "https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Macbook",
    quantity: 40,
    price: 500000,
    stock: 10,
  },
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subtotal + tax + shippingCharges;
const Cart = () => {
  const [coupon, setCoupon] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const timeOutd = setTimeout(() => {
      if (Math.random() > 0.5) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timeOutd);
      setIsValid(false);
    };
  }, [coupon]);
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => <CartItem cartItem={i}></CartItem>)
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
          <b>₹{total}</b>
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
