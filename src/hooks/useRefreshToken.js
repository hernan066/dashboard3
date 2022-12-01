import axios from "api/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "redux/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    /* setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    }); */
    dispatch(setCredentials({ accessToken: response.data.accessToken }));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
