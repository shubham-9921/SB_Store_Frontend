import React, { useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { OrderItemType, OrderType } from "../../types";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserInitialReducer } from "../../../types/reducerTypes";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderApi";
import { server } from "../../../redux/store";
import { SkeletonLoader } from "../../../components/Loader";
import { responseToast } from "../../../utils/feature";
import { MdDelete } from "react-icons/md";

const defaultValue: OrderType = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  name: " ",
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  _id: "",
  user: { _id: "", name: "" },
};

const TransactionManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserInitialReducer }) => state.userReducer
  );

  const { data, isLoading, isError } = useOrderDetailsQuery(id!);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    status,
    subtotal,
    discount,
    shippingCharges,
    tax,
    total,
    orderItems,
    user: { name },
  } = data?.order || defaultValue;
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id as string,
      orderId: id!,
    });

    responseToast(res, navigate, "/admin/transactions/");
  };
  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id as string,
      orderId: id!,
    });

    responseToast(res, navigate, "/admin/transactions");
  };

  if (isError) return <Navigate to="/404" />;
  return (
    <div className="adminContainer">
      <AdminSidebar />

      <main className="productMangement">
        {isLoading ? (
          <SkeletonLoader length={20} />
        ) : (
          <>
            <section
              style={{
                padding: "2rem",
              }}
            >
              <h2>Order Item</h2>
              {orderItems.map((i) => (
                <ProductCard
                  name={i.name}
                  photo={`${server}/${i.photo}`}
                  price={i.price}
                  quantity={i.quantity}
                  _id={i._id}
                >
                  {" "}
                </ProductCard>
              ))}
            </section>

            <article className="shippingInfoCard">
              <MdDelete onClick={deleteHandler} />
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name : {name}</p>
              <p>
                Address : {`${address},${city},${state},${country} ${pinCode}`}
              </p>

              <h5>Amount Info</h5>
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
          </>
        )}
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
