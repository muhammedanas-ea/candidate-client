import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROLES } from "../constants/env.config";

const CheckAuthRoleRoute = () => {
  const authstate = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return authstate?.accessToken === null ? (
    <Outlet />
  ) : authstate?.role[0] === ROLES.ADMIN ? (
    <Navigate to="/admin" state={{ from: location }} replace />
  ) : (
    <Navigate to="/candidate" state={{ from: location }} replace />
  );
};
export default CheckAuthRoleRoute;
