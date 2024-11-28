import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageresponceType } from "../types/apiTypes";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        dob: date,
        role: "user",
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data.message);
        <Navigate to={"/"} />;
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (res.error as MessageresponceType).message;
        toast.error(message);
        console.log(error);
      }
    } catch (error) {
      toast.error("SignIn failed !");
      console.log(error);
    }
  };
  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label htmlFor="">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="" disabled selected>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Gender</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>

          <button onClick={loginHandler}>
            <FcGoogle /> <span>SignIn with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
