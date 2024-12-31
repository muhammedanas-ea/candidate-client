import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROLES } from "../constants/env.config";
import { RootState } from "../redux/store/store";

interface RoleProtectedRouteProps {
  allowRoles: number[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  allowRoles,
}) => {
  const authstate = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return authstate?.role?.find((role) => allowRoles?.includes(role)) ? (
    <Outlet />
  ) : authstate?.userId ? (
    <Navigate
      to={
        location.state?.from || authstate.role[0] === ROLES.ADMIN
          ? "/admin"
          : "/candidate"
      }
      replace
    />
  ) : (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  );
};

export default RoleProtectedRoute;
