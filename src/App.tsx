import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./pages/Login";
import CheckAuthRoleRoute from "./routes/CheckAuthRoleRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import { ROLES } from "./constants/env.config";
import { ToastContainer } from "react-toastify";
import CandidateRoutes from "./routes/CandidateRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<CheckAuthRoleRoute />}>
          <Route path="/*" element={<Login />} />
        </Route>

        <Route element={<RoleProtectedRoute allowRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>

        <Route element={<RoleProtectedRoute allowRoles={[ROLES.CANDIDATE]} />}>
          <Route path="/candidate/*" element={<CandidateRoutes />} />
        </Route>  
      </Routes>
      <ToastContainer />
    </Router>
  );
}
