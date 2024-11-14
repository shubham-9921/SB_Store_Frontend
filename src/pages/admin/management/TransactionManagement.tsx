import React, { useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { OrderItemType, OrderType } from "../../types";
import { Link } from "react-router-dom";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D";

const orderItems: OrderItemType[] = [
  {
    name: "Puma",
    photo: img,
    _id: "FaJs",
    quantity: 100,
    price: 1000,
  },
];

const TransactionManagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Shubham ",
    address: "77 black street",
    city: "new york",
    state: "NY",
    country: "India",
    pinCode: 4145645,
    status: "Processing",
    subtotal: 4000,
    discount: 100,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 100,
    orderItems: orderItems,
    _id: "hgg",
  });

  const {
    name,
    address,
    city,
    state,
    country,
    pinCode,
    status,
    subtotal,
    discount,
    shippingCharges,
    tax,
    total,
    _id,
  } = order;

  const updateHandler = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: prevOrder.status === "Processing" ? "Shiped" : "Delivered",
    }));
  };
  return (
    <div className="adminContainer">
      <AdminSidebar />

      <main className="productMangement">
        <section
          style={{
            padding: "2rem",
          }}
        >
          <h2>Order Item</h2>
          {order.orderItems.map((i) => (
            <ProductCard
              name={i.name}
              photo={i.photo}
              price={i.price}
              quantity={i.quantity}
              _id={i._id}
            >
              {" "}
            </ProductCard>
          ))}
        </section>

        <article className="shippingInfoCard">
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name : {name}</p>
          <p>Address : {`${address},${city},${state},${country} ${pinCode}`}</p>

          <h5>Amount Unfo</h5>
          <p>Subtotal : {subtotal}</p>
          <p>Shipping Charges : {shippingCharges}</p>
          <p>Tax : {tax}</p>
          <p>Discount : {discount}</p>
          <p>Total : {total}</p>

          <h5>Status Info</h5>
          <p>
            Status :{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shiped"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </span>
          </p>

          <button onClick={updateHandler}> Process Order</button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="transctionProductCard">
    <img src={photo} alt={name}></img>
    <Link to={`/product/${_id}`}></Link>
    <span>
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>
);
export default TransactionManagement;
