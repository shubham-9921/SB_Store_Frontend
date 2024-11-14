import React from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";

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
  return (
    <>
      <div className="adminContainer">
        <AdminSidebar />
        <main className="chartContainer">
          <section>
            <LineChart
              data={[25, 74, 39, 25, 78, 88, 7, 87, 87, 68, 78, 98, 53]}
              label="Users"
              borderColor="#2D9596"
              backgroundColor="#9AD0C2"
              labels={months}
            />
            <h2>Active Users</h2>
          </section>
          <section>
            <LineChart
              data={[
                250, 740, 390, 200, 700, 880, 100, 800, 860, 680, 780, 908, 503,
              ]}
              label="Revenue"
              borderColor="#CB9DF0"
              backgroundColor="#F0C1E1"
              labels={months}
            />
            <h2>Total Revenue </h2>
          </section>
          <section>
            <LineChart
              data={[
                2500, 7400, 3900, 2500, 7800, 8800, 700, 8700, 8700, 6800, 7800,
                9008, 5003,
              ]}
              label="Products"
              borderColor="#FFA62F"
              backgroundColor="#FFC96F"
              labels={months}
            />
            <h2>Total Products (SKU)</h2>
          </section>
          <section>
            <LineChart
              data={[
                250, 740, 390, 250, 780, 800, 70, 70, 870, 600, 780, 90, 503,
              ]}
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
