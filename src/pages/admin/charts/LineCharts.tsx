import React from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { useSelector } from "react-redux";
import { CustomRootState } from "../../../redux/store";
import { useLineQuery } from "../../../redux/api/dashboardApi";
import { CustomError } from "../../../types/apiTypes";
import toast from "react-hot-toast";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const LineCharts = () => {
  const { user } = useSelector(
    (state: { userReducer: CustomRootState }) => state.userReducer
  );

  const { data, isLoading, isError, error } = useLineQuery(user._id as string);
  const chart = data?.charts;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <>
      <div className="adminContainer">
        <AdminSidebar />
        <main className="chartContainer">
          <section>
            <LineChart
              data={chart?.users}
              label="Users"
              borderColor="#2D9596"
              backgroundColor="#9AD0C2"
              labels={months}
            />
            <h2>Active Users</h2>
          </section>
          <section>
            <LineChart
              data={chart?.revenue}
              label="Revenue"
              borderColor="#CB9DF0"
              backgroundColor="#F0C1E1"
              labels={months}
            />
            <h2>Total Revenue </h2>
          </section>
          <section>
            <LineChart
              data={chart?.products}
              label="Products"
              borderColor="#FFA62F"
              backgroundColor="#FFC96F"
              labels={months}
            />
            <h2>Total Products (SKU)</h2>
          </section>
          <section>
            <LineChart
              data={chart?.discount}
              label="Discount"
              borderColor="#CAF4FF"
              backgroundColor="#A0DEFF"
              labels={months}
            />
            <h2>Total Discount Alloted </h2>
          </section>
        </main>
      </div>
    </>
  );
};

export default LineCharts;
