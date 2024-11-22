import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
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
  return (
    <div className="shipping">
      <button className="backBtn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>

      <form
        action="
      "
      >
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
