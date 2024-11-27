import React, { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { SkeletonLoader } from "../../components/Loader";
import {
  useAllUsersQuery,
  useDeleteUsersMutation,
} from "../../redux/api/userApi";
import { CustomRootState } from "../../redux/store";
import { CustomError } from "../../types/apiTypes";
import { responseToast } from "../../utils/feature";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers: React.FC = () => {
  const [row, setRow] = useState<DataType[]>([]);

  const navigate = useNavigate();

  const { user } = useSelector(
    (state: { userReducer: CustomRootState }) => state.userReducer
  );

  const { data, isLoading, error, isError } = useAllUsersQuery(
    user._id as string
  );

  const Table = TableHOC<DataType>(
    columns,
    row,
    "dashboardProductTable",
    "Customers",
    true
  )();

  const [deleteUser] = useDeleteUsersMutation();

  const deleteHandler = async (id: string) => {
    const res = await deleteUser({ userId: user._id, id });
    responseToast(res, navigate, "/order");
  };

  useEffect(() => {
    if (data) {
      setRow(
        data?.users.map((i) => ({
          avatar: (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={i.photo}
              alt="Shoes"
            />
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>{isLoading ? <SkeletonLoader length={10} /> : Table}</main>
    </div>
  );
};

export default Customers;
