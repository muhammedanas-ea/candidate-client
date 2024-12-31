import { Routes, Route } from "react-router-dom";
import Profile from "../pages/candidate/Profile";
import CandidateLayout from "../layouts/CandidateLayout";
import AddProfile from "../pages/candidate/AddProfile";


const CandidateRoutes = () => {
  return (
    <Routes>
      <Route element={<CandidateLayout />}>
        <Route path="/" element={<Profile />} />
        <Route path="/add-profile" element={<AddProfile />} />
      </Route>
    </Routes>
  );
};

export default CandidateRoutes;
