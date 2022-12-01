/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import { useState, useEffect } from "react";
import Loading from "components/DRLoading";
import { useSelector } from "react-redux";
import useRefreshToken from "hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>Refresh");
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  /* useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${token}`);
  }, [isLoading]); */

  return isLoading ? <Loading /> : <Outlet />;
}

export default PersistLogin;
