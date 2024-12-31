import { Routes, Route } from "react-router-dom";
import CandidateList from "../pages/admin/CandidateList";
import AdminLayout from "../layouts/AdminLayout";
import AddCandidate from "../pages/admin/AddCandidate";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<CandidateList />} />
        <Route path="/add-candidate" element={<AddCandidate />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
