import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/slices/authSlice";
import axios from "../utils/axios"

function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      console.log("success");
      dispatch(logOut());
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return logout;
}

export default useLogout;
