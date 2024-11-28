import React, { ReactElement, useEffect, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { useSelector } from "react-redux";
import { UserInitialReducer } from "../types/reducerTypes";
import { CustomError } from "../types/apiTypes";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../components/Loader";
import { Link } from "react-router-dom";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const columns: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Qunatity",
    accessor: "quantity",
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
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const { user } = useSelector(
    (state: { userReducer: UserInitialReducer }) => state.userReducer
  );

  const { data, isLoading, isError, error } = useMyOrdersQuery(
    user?._id as string
  );

  const [rows, setRow] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      setRow(
        data.order.map((i) => ({
          _id: i._id,
          amount: i.total,
          quantity: i.orderItems.length,
          discount: i.discount,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/order/${i._id}`}>View</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboardProductBox",
    "Orders"
  )();

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="container">
      <h1>MY Orders</h1>

      {isLoading ? <SkeletonLoader length={20} /> : Table}
    </div>
  );
};

export default Orders;
