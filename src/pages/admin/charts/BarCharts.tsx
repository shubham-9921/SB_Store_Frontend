import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { SkeletonLoader } from "../../../components/Loader";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import { CustomError } from "../../../types/apiTypes";
import { UserInitialReducer } from "../../../types/reducerTypes";
import { getLastMonths } from "../../../utils/feature";

const BarCharts = () => {
  const { user } = useSelector(
    (state: { userReducer: UserInitialReducer }) => state.userReducer
  );

  const { lastSixMonth, lastTwelveMonth } = getLastMonths();

  const { data, isLoading, isError, error } = useBarQuery(user._id!);

  const orders = data?.charts.orders || [];
  const products = data?.charts.products || [];
  const users = data?.charts.users || [];

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
                data_1={products}
                data_2={users}
                title_1="Products"
                title_2="Users"
                labels={lastSixMonth}
                bgColor_1="blue"
                bgColor_2="skyblue"
              ></BarChart>

              <h2>Top Selling Products & Top Customers</h2>
            </section>
            <section>
              <BarChart
                horizontal={true}
                data_1={orders}
                title_1="Orders"
                bgColor_1="#6A1E55"
                labels={lastTwelveMonth}
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
