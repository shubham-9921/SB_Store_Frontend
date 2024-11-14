import React from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { categories } from "../../assets/data.json";

const PieCharts = () => {
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Pie & Doughnut Chart</h1>
        <section>
          <div>
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[12, 13, 35]}
              bgColor={["#4A628A", "#7AB2D3", "#B9E5E8"]}
              offset={[0, 0, 40]}
            />
          </div>

          <h2>Order Fullfillment Ratio</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={categories.map((i: any) => i.heading)}
              data={categories.map((i: any) => i.value)}
              bgColor={categories.map(
                (i: any) => `hsl(${i.value * 4},80%,50%)`
              )}
              legends={false}
              offset={[0, 0, 40]}
            />
          </div>

          <h2>Products Categories Ratio</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={["InStock", "Out Of Stock"]}
              data={[40, 20]}
              bgColor={["#FF204E", "#A13333"]}
              legends={false}
              offset={[0, 80]}
              cutout="70%"
            />
          </div>

          <h2>Stock Availablity</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Bunt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[40, 20, 54, 64, 78]}
              bgColor={["#9ADCFF", "#BAABDA", "#7A5D7E", "#FF7B54", "#EB586F"]}
              legends={false}
              offset={[20, 30, 20, 30, 50]}
              cutout="70%"
            />
          </div>

          <h2>Revenue Distribution</h2>
        </section>
        <section>
          <div>
            <PieChart
              labels={[
                "Teenager( below 20)",
                "Adult(20 - 40)",
                "Older (above 40)",
              ]}
              data={[63, 75, 36]}
              bgColor={["#7AB2D3", "#FF487E", "#4A628A"]}
              offset={[0, 0, 50]}
            />
          </div>

          <h2>User Age Group</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={["Admin", "Customer"]}
              data={[36, 766]}
              bgColor={["#352F44", "#B9B4C7"]}
              offset={[0, 80]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
