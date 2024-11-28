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

  const Processing = data?.charts?.Processing || 0;
  const Shipped = data?.charts?.Shipped || 0;
  const Delivered = data?.charts?.Delivered || 0;
  const categories = data?.charts?.productCategory || [];
  const inStock = data?.charts.stockAvailablity.inStock || 0;
  const outStock = data?.charts.stockAvailablity.outStock || 0;

  const burnt = data?.charts.revenueDistribution.burnt || 0;
  const marketingCost = data?.charts.revenueDistribution.marketingCost || 0;
  const productCost = data?.charts.revenueDistribution.productCost || 0;
  const discount = data?.charts.revenueDistribution.discount || 0;
  const netMargin = data?.charts.revenueDistribution.netMargin || 0;

  const teen = data?.charts.userAgeGroup.teen || 0;
  const adult = data?.charts.userAgeGroup.adult || 0;
  const old = data?.charts.userAgeGroup.old || 0;

  const adminUsers = data?.charts.userDistribution.adminUsers || 0;
  const customerUsers = data?.charts.userDistribution.customerUsers || 0;

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
                  data={[Processing, Shipped, Delivered]}
                  bgColor={["#4A628A", "#7AB2D3", "#B9E5E8"]}
                  offset={[0, 0, 40]}
                />
              </div>

              <h2>Order Fullfillment Ratio</h2>
            </section>
            <section>
              <div>
                <DoughnutChart
                  labels={categories.map((i) => Object.keys(i)[0])}
                  data={categories.map((i) => Object.values(i)[0])}
                  bgColor={categories.map(
                    (i) =>
                      `hsl(${Object.values(i)[0] * 4}, ${
                        Object.values(i)[0]
                      }%, 50%)`
                  )}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>

              <h2>Products Categories Ratio</h2>
            </section>
            <section>
              <div>
                <DoughnutChart
                  labels={["InStock", "Out Of Stock"]}
                  data={[inStock, outStock]}
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
                    marketingCost,
                    discount,
                    burnt,
                    productCost,
                    netMargin,
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
                  data={[teen, adult, old]}
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
                  data={[adminUsers, customerUsers]}
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
