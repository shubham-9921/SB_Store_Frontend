import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { useLineQuery } from "../../../redux/api/dashboardApi";
import { CustomRootState } from "../../../redux/store";
import { CustomError } from "../../../types/apiTypes";
import { getLastMonths } from "../../../utils/feature";

const LineCharts = () => {
  const { user } = useSelector(
    (state: { userReducer: CustomRootState }) => state.userReducer
  );

  const { lastTwelveMonth } = getLastMonths();

  const { data, isLoading, isError, error } = useLineQuery(user._id as string);

  const products = data?.charts.products || [];
  const revenue = data?.charts.revenue || [];
  const users = data?.charts.users || [];
  const discount = data?.charts.discount || [];

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
              data={users}
              label="Users"
              borderColor="#2D9596"
              backgroundColor="#9AD0C2"
              labels={lastTwelveMonth}
            />
            <h2>Active Users</h2>
          </section>
          <section>
            <LineChart
              data={revenue}
              label="Revenue"
              borderColor="#CB9DF0"
              backgroundColor="#F0C1E1"
              labels={lastTwelveMonth}
            />
            <h2>Total Revenue </h2>
          </section>
          <section>
            <LineChart
              data={products}
              label="Products"
              borderColor="#FFA62F"
              backgroundColor="#FFC96F"
              labels={lastTwelveMonth}
            />
            <h2>Total Products (SKU)</h2>
          </section>
          <section>
            <LineChart
              data={discount}
              label="Discount"
              borderColor="#CAF4FF"
              backgroundColor="#A0DEFF"
              labels={lastTwelveMonth}
            />
            <h2>Total Discount Alloted </h2>
          </section>
        </main>
      </div>
    </>
  );
};

export default LineCharts;
