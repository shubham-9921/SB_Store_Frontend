import React from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";

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
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <section>
          <BarChart
            data_1={[200, 363, 354, 485, 485, 234, 546]}
            data_2={[165, 546, 421, 485, 451, 545, 212]}
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
            data_1={[200, 363, 354, 485, 485, 234, 546, 545, 87, 685, 566, 676]}
            title_1="Products"
            bgColor_1="#6A1E55"
            labels={months}
            data_2={[]}
            title_2={""}
            bgColor_2={""}
          ></BarChart>
          <h2>Orders Through the Year</h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;
