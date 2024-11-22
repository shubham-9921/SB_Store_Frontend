import React, { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";

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
  const [rows] = useState<DataType[]>([
    {
      _id: "yhgu",
      amount: 100,
      quantity: 100,
      discount: 100,
      status: <span className="red">Processing</span>,
      action: <button>View</button>,
    },
  ]);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboardProductBox",
    "Orders"
  );
  return (
    <div className="container">
      <h1>MY Orders</h1>

      {Table()}
    </div>
  );
};

export default Orders;
