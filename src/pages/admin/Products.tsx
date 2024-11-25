import React, { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from "../../redux/api/productApi";
import { server } from "../../redux/store";
import { SkeletonLoader } from "../../components/Loader";
import { useSelector } from "react-redux";
import { UserInitialReducer } from "../../types/reducerTypes";
import { CustomError } from "../../types/apiTypes";
import toast from "react-hot-toast";

interface TableDataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<TableDataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products: React.FC = () => {
  const { user } = useSelector(
    (state: { userReducer: UserInitialReducer }) => state.userReducer
  );

  const { data, isLoading, isError, error } = useAllProductsQuery(user?._id!);

  const [row, setRow] = useState<TableDataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  useEffect(() => {
    if (data) {
      setRow(
        data.products.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/products/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<TableDataType>(
    columns,
    row,
    "dashboardProductTable",
    "Products",
    true
  )();

  return (
    <>
      {" "}
      <div className="adminContainer">
        <AdminSidebar />
        <main>{isLoading ? <SkeletonLoader length={20} /> : Table}</main>
        <Link to="/admin/products/new" className="addProductBtn">
          <FaPlus></FaPlus>
        </Link>
      </div>
    </>
  );
};

export default Products;
