import { BiMaleFemale } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import AdminSidebar from "../../components/admin/AdminSidebar";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import userImage from "../../assets/userpic.png";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import DashboardTable from "../../components/admin/DashboardTable";
import { SkeletonLoader } from "../../components/Loader";
import { useStatsQuery } from "../../redux/api/dashboardApi";
import { CustomError } from "../../types/apiTypes";
import { UserInitialReducer } from "../../types/reducerTypes";

const Dashboard: React.FC = () => {
  const { user } = useSelector(
    (state: { userReducer: UserInitialReducer }) => state.userReducer
  );

  const { data, isLoading, error, isError } = useStatsQuery(
    user?._id as string
  );
  const stats = data?.stats;
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <>
      <div className="adminContainer">
        <AdminSidebar />
        <main className="dashboard">
          {isLoading ? (
            <SkeletonLoader length={20} />
          ) : (
            <>
              {" "}
              <div className="bar">
                <FaSearch />
                <input type="text" placeholder="Seaech by data, user...." />
                <FaBell></FaBell>
                <img
                  style={{ borderRadius: "50%" }}
                  src={user?.photo || userImage}
                  alt="User"
                />
              </div>
              <section className="widgetContainer">
                <WidgetItem
                  percentage={stats?.changeInPercent.revenue as number}
                  amount={true}
                  value={stats?.count.revenue as number}
                  heading="Revenue"
                  color="blue"
                ></WidgetItem>
                <WidgetItem
                  percentage={stats?.count.users as number}
                  amount={false}
                  value={stats?.count.users as number}
                  heading="Users"
                  color="#00FF9C"
                ></WidgetItem>
                <WidgetItem
                  percentage={stats?.changeInPercent.product as number}
                  amount={false}
                  value={stats?.count.products as number}
                  heading="Products"
                  color="#F5004F"
                ></WidgetItem>
                <WidgetItem
                  percentage={stats?.changeInPercent.order as number}
                  amount={false}
                  value={stats?.count.orders as number}
                  heading="Orders"
                  color="#2E0249"
                ></WidgetItem>
              </section>
              <section className="graphContainer">
                <div className="revenueChart">
                  <h2>Revenue & Transactions</h2>

                  {/* Graph HERE */}

                  <BarChart
                    data_1={stats?.chart.orderMonthsRevenue as number[]}
                    data_2={stats?.chart.orderMonthsCount as number[]}
                    title_1="Revenue"
                    title_2="Transacation"
                    bgColor_1="skyblue"
                    bgColor_2="blue"
                    // horizontal= {false}
                  />
                </div>
                <div className="inventoryChart">
                  <h2>Inventory</h2>

                  <div>
                    {stats?.categoryCount.map((i) => {
                      const [heading, value] = Object.entries(i)[0];
                      return (
                        <CatergoryItem
                          key={heading}
                          value={value}
                          heading={heading}
                          color={`hsl(${value * 4}, ${value}%, 50%)`}
                        />
                      );
                    })}
                  </div>
                </div>
              </section>
              <section className="transactionContainer">
                <div className="genderChart">
                  <h2>Gender ratio</h2>
                  {/* gender Charrt */}
                  <DoughnutChart
                    labels={["Female", "Male"]}
                    data={[
                      stats?.gender.female as number,
                      stats?.gender.male as number,
                    ]}
                    bgColor={["red", "purple"]}
                    cutout={80}
                  ></DoughnutChart>
                  <p>
                    <BiMaleFemale />
                  </p>
                </div>

                <DashboardTable
                  data={stats?.modifiedLatestTransactions as []}
                ></DashboardTable>
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percentage: number;
  amount?: boolean;
  color: string;
}

const WidgetItem = ({
  heading,
  value,
  percentage,
  amount,
  color,
}: WidgetItemProps) => (
  <article className="widgetItem">
    <div className="widgetInfo">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percentage > 0 ? (
        <span className="green">
          <HiTrendingUp />{" "}
          {percentage > 0 && `${percentage > 1000 ? 999 : percentage}%`}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> -
          {percentage < 0 && `${percentage < -1000 ? -999 : percentage}%`}
        </span>
      )}
    </div>

    <div
      className="widgetCircle"
      style={{
        background: `conic-gradient(
      ${color}  ${
          (Math.abs(percentage) / 100) * 360
        }deg, rgb(255 ,255,255) 0 )`,
      }}
    >
      <span style={{ color }}>
        {percentage > 0 && `${percentage > 1000 ? 999 : percentage}%`}
        {percentage < 0 && `${percentage < -1000 ? -999 : percentage}%`}
      </span>
    </div>
  </article>
);

interface CatergoryProps {
  heading: string;
  value: number;
  color: string;
}

const CatergoryItem = ({ heading, value, color }: CatergoryProps) => (
  <div className="categoryItem">
    <h5>{heading}</h5>

    <div>
      <div style={{ backgroundColor: color, width: `${value}%` }}></div>
    </div>

    <span> {value}%</span>
  </div>
);

export default Dashboard;
