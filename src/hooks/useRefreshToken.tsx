import { updateToken } from "../redux/slices/authSlice";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";

function useRefreshToken() {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.get("/auth/get-new-access-token", {
      withCredentials: true,
    });

    dispatch(updateToken({ accessToken: response.data.accessToken }));

    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
