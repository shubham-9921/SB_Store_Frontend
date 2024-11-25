import React, { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserInitialReducer } from "../../types/reducerTypes";
import { useAllOrdersQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { CustomError } from "../../types/apiTypes";
import { SkeletonLoader } from "../../components/Loader";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  qunatity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Qunatity",
    accessor: "qunatity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transactions: React.FC = () => {
  const { user } = useSelector(
    (state: { userReducer: UserInitialReducer }) => state.userReducer
  );

  const { data, isLoading, isError, error } = useAllOrdersQuery(
    user?._id as string
  );

  const [row, setRow] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      setRow(
        data.orders.map((i) => ({
          user: i.user.name,
          amount: i.total,
          discount: i.discount,
          qunatity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status == "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transactions/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    row,
    "dashboardProductTable",
    "Transaction",
    true
  )();

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <>
      {" "}
      <div className="adminContainer">
        <AdminSidebar />
        <main>{isLoading ? <SkeletonLoader length={20} /> : Table}</main>
      </div>
    </>
  );
};

export default Transactions;
