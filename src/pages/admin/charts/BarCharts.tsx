import React from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import { useSelector } from "react-redux";
import { CustomRootState } from "../../../redux/store";
import { CustomError } from "../../../types/apiTypes";
import { SkeletonLoader } from "../../../components/Loader";
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
const BarCharts = () => {
  const { user } = useSelector(
    (state: { userReducer: CustomRootState }) => state.userReducer
  );

  const { data, isLoading, isError, error } = useBarQuery(user._id as string);
  const chart = data?.charts;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        {isLoading ? (
          <SkeletonLoader length={10} />
        ) : (
          <>
            <section>
              <BarChart
                data_1={chart?.products as number[]}
                data_2={chart?.users as number[]}
                title_1="Products"
                title_2="Users"
                bgColor_1="blue"
                bgColor_2="skyblue"
              ></BarChart>

              <h2>Top Selling Products & Top Customers</h2>
            </section>
            <section>
              <BarChart
                horizontal={true}
                data_1={chart?.users as number[]}
                title_1="Products"
                bgColor_1="#6A1E55"
                labels={months}
                data_2={[]}
                title_2={""}
                bgColor_2={""}
              ></BarChart>
              <h2>Orders Through the Year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default BarCharts;
