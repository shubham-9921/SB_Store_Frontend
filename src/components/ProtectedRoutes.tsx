import React, { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

type PropType = {
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  children?: ReactElement;
  redirect?: string;
};

const ProtectedRoutes = ({
  isAuthenticated,
  admin,
  adminOnly,
  children,
  redirect = "/",
}: PropType) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;
  if (adminOnly && !admin) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
