import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../utils/axios";
import useRefreshToken from "./useRefreshToken";
import useLogout from "./useLogout";
import { RootState } from "../redux/store/store";
import { GenerateError } from "../toast/Toast";

const UseAxiosPrivate = () => {
  const logout = useLogout();
  const refresh = useRefreshToken();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authState?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log("helloooooooooo");
        if (error?.response?.data?.message) {
          GenerateError(error?.response?.data?.message);
        }
        if (error?.response?.status === 401 && error?.response?.data?.access) {
          await logout();
          return;
        }
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          const newConfig = {
            ...prevRequest,
            headers: {
              ...prevRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          };
          return axiosPrivate(newConfig);
        }

        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authState, refresh]);

  return axiosPrivate;
};

export default UseAxiosPrivate;
