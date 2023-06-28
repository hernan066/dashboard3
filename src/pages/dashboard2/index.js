/* eslint-disable no-unused-vars */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useGetOrdersTodayQuery, useGetOrdersActiveQuery } from "api/orderApi";
import { useGetClientsQuery } from "api/clientsApi";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import DashboardToday from "./components/DashboardToday";

function Dashboard2() {
  const { data: dataOrdersToday, isLoading: l1, isError: e1 } = useGetOrdersTodayQuery();
  const { data: listClients, isLoading: l2, isError: e2 } = useGetClientsQuery();
  const { data: dataOrders, isLoading: l3, isError: e3 } = useGetOrdersActiveQuery();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places", "visualization"],
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {(l1 || l2 || l3 || !isLoaded) && <Loading />}
      {(e1 || e2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
      {dataOrders && listClients && dataOrdersToday && (
        <DashboardToday
          clients={listClients.data.clients}
          orders={dataOrdersToday.data.orders}
          activeOrders={dataOrders.data.orders}
        />
      )}
    </DashboardLayout>
  );
}

export default Dashboard2;
