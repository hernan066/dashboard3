/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import apiRequest from "api/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { onLogout, clearErrorMessage, onLogin, onChecking } from "redux/authSlice";

function useAuthStore() {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await apiRequest.post("/auth/admin/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        onLogin({
          name: data?.user.name,
          _id: data?.user._id,
          avatar: data?.user.avatar,
          token: data?.token,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(onLogout(error.response.data?.msg));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
    }
  };

  /* const startRegister = async({ email, password, name }) => {
        dispatch( onChecking() );
        try {
            const { data } = await apiRequest.post('/auth/new',{ email, password, name });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
            
        } catch (error) {
            dispatch( onLogout( error.response.data?.msg || '--' ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    } */

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await apiRequest.get("auth/revalidate_token");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      return dispatch(
        onLogin({
          name: data?.user?.name,
          _id: data?.user?._id,
          avatar: data?.user?.avatar,
          token: data?.token,
        })
      );
    } catch (error) {
      console.log(error);
      localStorage.clear();
      return dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogout,
  };
}

export default useAuthStore;
