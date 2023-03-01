/* eslint-disable no-unused-vars */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {
  useGetOrdersTodayQuery,
  useGetOrdersActiveQuery,
  useGetOrdersByDaysQuery,
} from "api/orderApi";
import { useGetClientsQuery } from "api/clientsApi";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { dateToLocalDateMin } from "utils/dateFormat";
import DashboardToday from "./components/DashboardToday";

function Dashboard2() {
  const { data: dataOrdersToday, isLoading: l1, isError: e1 } = useGetOrdersTodayQuery();
  const { data: listClients, isLoading: l2, isError: e2 } = useGetClientsQuery();
  const { data: dataOrders, isLoading: l3, isError: e3 } = useGetOrdersActiveQuery();
  const { data: dataOrdersByDays, isLoading: l4, isError: e4 } = useGetOrdersByDaysQuery(7);

  console.log(dataOrdersByDays);
  // console.log(dateToLocalDateMin(dataOrdersByDays.from));

  console.log(dataOrdersToday);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {(l1 || l2 || l3) && <Loading />}
      {(e1 || e2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
      {dataOrders && listClients && dataOrdersToday && (
        <DashboardToday
          clients={listClients.data.clients}
          orders={dataOrdersToday.data.orders}
          activeOrders={dataOrders.data.orders}
        />
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard2;
