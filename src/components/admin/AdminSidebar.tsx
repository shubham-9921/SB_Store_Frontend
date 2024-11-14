import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineBarChart, AiOutlineTransaction } from "react-icons/ai";
import { FaChartLine, FaChartPie, FaUsers } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { LuCoins } from "react-icons/lu";
import {
  MdOutlineProductionQuantityLimits,
  MdSpaceDashboard,
} from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import { TiStopwatch } from "react-icons/ti";
import { Link, Location, useLocation } from "react-router-dom";
const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth <= 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth <= 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}
      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.3s",
              }
            : {}
        }
      >
        <h1>Logo</h1>

        <DivOne location={location}></DivOne>
        <DivTwo location={location}></DivTwo>
        <DivThree
          location={location}
          phoneActive={phoneActive}
          setShowModal={setShowModal}
        ></DivThree>
      </aside>
    </>
  );
};

const DivOne = ({ location }: { location: Location }) => (
  <div>
    <h5> Dashboard</h5>
    <ul>
      <Li
        url="/admin/dashboard"
        text={"Dashboard"}
        location={location}
        Icon={MdSpaceDashboard}
      />
      <Li
        url="/admin/products"
        text={"Products"}
        location={location}
        Icon={MdOutlineProductionQuantityLimits}
      />
      <Li
        url="/admin/customers"
        text={"Customers"}
        location={location}
        Icon={FaUsers}
      />
      <Li
        url="/admin/transactions"
        text={"Transactions"}
        location={location}
        Icon={AiOutlineTransaction}
      />
    </ul>
  </div>
);

const DivTwo = ({ location }: { location: Location }) => (
  <div>
    <h5> Charts</h5>
    <ul>
      <Li
        url="/admin/charts/bar"
        text={"Bar"}
        location={location}
        Icon={AiOutlineBarChart}
      />
      <Li
        url="/admin/charts/pie"
        text={"Pie"}
        location={location}
        Icon={FaChartPie}
      />
      <Li
        url="/admin/charts/line"
        text={"Line"}
        location={location}
        Icon={FaChartLine}
      />
    </ul>
  </div>
);
const DivThree = ({
  location,
  phoneActive,
  setShowModal,
}: {
  location: Location;
  phoneActive: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => (
  <div>
    <h5>Apps</h5>
    <ul>
      <Li
        url="/admin/app/coupon"
        text={"Coupon"}
        location={location}
        Icon={RiCoupon2Fill}
      />
      <Li
        url="/admin/app/stopwatch"
        text={"Stopwatch"}
        location={location}
        Icon={TiStopwatch}
      />
      <Li
        url="/admin/app/toss"
        text={"Toss"}
        location={location}
        Icon={LuCoins}
      />
    </ul>
    {phoneActive && (
      <button
        id="closeSideBar"
        onClick={() => {
          setShowModal(false);
        }}
      >
        Close
      </button>
    )}
  </div>
);

interface LiProps {
  url: string;
  location: Location;
  text: string;
  Icon: IconType;
}

const Li = ({ url, location, text, Icon }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url) ? "#81DAE3" : "white",
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? "rgba(0,115,255)" : "black",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
