import { Column } from "react-table";
import TableHOC from "./TableHOC";

interface TableProps {
  id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: Column<TableProps>[] = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const DashboardTable = ({ data = [] }: { data: TableProps[] }) => {
  return TableHOC<TableProps>(
    columns,
    data,
    "transactionBox",
    "Top Transaction"
  )();
};

export default DashboardTable;
