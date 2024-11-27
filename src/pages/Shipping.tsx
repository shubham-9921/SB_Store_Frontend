import { ChangeEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartInitialReducer } from "../types/reducerTypes";
import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: { cartReducer: CartInitialReducer }) => state.cartReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));
    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/pay", { state: data?.clientSecret });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems]);
  return (
    <div className="shipping">
      <button className="backBtn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>

      <form onSubmit={submitHandler}>
        <h1> Shipping Address</h1>

        <input
          required
          type="text"
          value={shippingInfo.address}
          name="address"
          placeholder="Address"
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          value={shippingInfo.city}
          name="city"
          placeholder="City"
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          value={shippingInfo.state}
          name="state"
          placeholder="State"
          onChange={changeHandler}
        />

        <select
          required
          name="country"
          id=""
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="" disabled selected>
            {" "}
            Select Country
          </option>
          <option value="india"> India </option>
          <option value="usa"> USA </option>
        </select>
        <input
          required
          type="number"
          value={shippingInfo.pinCode}
          name="pinCode"
          placeholder="Pin Code"
          onChange={changeHandler}
        />

        <button>Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
