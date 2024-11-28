import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { categories } from "../../../assets/data.json";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { usePiesQuery } from "../../../redux/api/dashboardApi";
import { CustomRootState } from "../../../redux/store";
import { CustomError } from "../../../types/apiTypes";
import { SkeletonLoader } from "../../../components/Loader";

const PieCharts = () => {
  const { user } = useSelector(
    (state: { userReducer: CustomRootState }) => state.userReducer
  );

  const { data, isLoading, isError, error } = usePiesQuery(user._id as string);
  const chart = data?.charts!;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Pie & Doughnut Chart</h1>

        {isLoading ? (
          <SkeletonLoader length={20} />
        ) : (
          <>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[chart?.Processing, chart?.Shipped, chart?.Delivered]}
                  bgColor={["#4A628A", "#7AB2D3", "#B9E5E8"]}
                  offset={[0, 0, 40]}
                />
              </div>

              <h2>Order Fullfillment Ratio</h2>
            </section>
            <section>
              <div>
                <DoughnutChart
                  labels={chart.productCategory.map((i: any) => {
                    const [heading, value] = Object.entries(i)[0];

                    return heading;
                  })}
                  data={chart.productCategory.map((i: any) => {
                    const [heading, value] = Object.entries(i)[0];

                    return value;
                  })}
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
                  data={[
                    chart.stockAvailablity.inStock,
                    chart.stockAvailablity.outStock,
                  ]}
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
                  data={[
                    chart.revenueDistribution.marketingCost,
                    chart.revenueDistribution.discount,
                    chart.revenueDistribution.burnt,
                    chart.revenueDistribution.productCost,
                    chart.revenueDistribution.netMargin,
                  ]}
                  bgColor={[
                    "#9ADCFF",
                    "#BAABDA",
                    "#7A5D7E",
                    "#FF7B54",
                    "#EB586F",
                  ]}
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
                  data={[
                    chart.userAgeGroup.teen,
                    chart.userAgeGroup.adult,
                    chart.userAgeGroup.old,
                  ]}
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
                  data={[
                    chart.userDistribution.adminUsers,
                    chart.userDistribution.customerUsers,
                  ]}
                  bgColor={["#352F44", "#B9B4C7"]}
                  offset={[0, 80]}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
