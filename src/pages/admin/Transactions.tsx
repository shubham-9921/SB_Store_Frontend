import React, { ReactElement, useCallback, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";

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

const arr: DataType[] = [
  {
    user: "Shubham",
    amount: 1000,
    discount: 100,
    qunatity: 3,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transactions/dsfj">Manage</Link>,
  },
  {
    user: "Shubham",
    amount: 1000,
    discount: 100,
    qunatity: 3,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transactions/dsfj">Manage</Link>,
  },
  {
    user: "Shubham",
    amount: 1000,
    discount: 100,
    qunatity: 3,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transactions/dsfj">Manage</Link>,
  },
];
const Transactions: React.FC = () => {
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboardProductTable",
      "Transaction",
      true
    ),
    []
  );
  return (
    <>
      {" "}
      <div className="adminContainer">
        <AdminSidebar />
        <main>{Table()}</main>
      </div>
    </>
  );
};

export default Transactions;
