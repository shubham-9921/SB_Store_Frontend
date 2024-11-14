import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { BiMaleFemale } from "react-icons/bi";

import userImage from "../../assets/userpic.png";
import data from "../../assets/data.json";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import DashboardTable from "../../components/admin/DashboardTable";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="adminContainer">
        <AdminSidebar />
        <main className="dashboard">
          <div className="bar">
            <FaSearch />
            <input type="text" placeholder="Seaech by data, user...." />
            <FaBell></FaBell>
            <img src={userImage} alt="User" />
          </div>

          <section className="widgetContainer">
            <WidgetItem
              percentage={40}
              amount={true}
              value={41000}
              heading="Revaenue"
              color="blue"
            ></WidgetItem>
            <WidgetItem
              percentage={40}
              amount={true}
              value={41000}
              heading="Revaenue"
              color="blue"
            ></WidgetItem>
            <WidgetItem
              percentage={40}
              amount={true}
              value={41000}
              heading="Revaenue"
              color="blue"
            ></WidgetItem>
            <WidgetItem
              percentage={40}
              amount={true}
              value={41000}
              heading="Revaenue"
              color="blue"
            ></WidgetItem>
          </section>

          <section className="graphContainer">
            <div className="revenueChart">
              <h2>Revenue & Transactions</h2>

              {/* Graph HERE */}

              <BarChart
                data_1={[300, 144, 436, 154, 245, 213]}
                data_2={[230, 214, 121, 542, 326, 324]}
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
                {data.categories.map((item) => (
                  <CatergoryItem
                    heading={item.heading}
                    value={item.value}
                    color={`hsl(${item.value * 4},${item.value}%,50%)`}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="transactionContainer">
            <div className="genderChart">
              <h2>Gender ratio</h2>
              {/* gender Charrt */}
              <DoughnutChart
                labels={["Female", "Male"]}
                data={[12, 19]}
                bgColor={["red", "purple"]}
                cutout={80}
              ></DoughnutChart>
              <p>
                <BiMaleFemale />
              </p>
            </div>

            <DashboardTable data={data.transaction}></DashboardTable>
          </section>
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
          <HiTrendingUp /> {percentage} %
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> -{percentage} %
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
      <span style={{ color }}>{percentage} %</span>
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
