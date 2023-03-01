/* eslint-disable no-unused-vars */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useGetOrdersQuery } from "api/orderApi";
import { useGetClientsQuery } from "api/clientsApi";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import DashboardTotals from "./components/OrdersOverview/DashboardTotals";

function Dashboard1() {
  const { data: dataOrders, isLoading: l1, isError: e1 } = useGetOrdersQuery();
  const { data: listClients, isLoading: l2, isError: e2 } = useGetClientsQuery();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {(l1 || l2) && <Loading />}
      {(e1 || e2) && <Alert severity="error">Ha ocurrido un error</Alert>}
      {dataOrders && listClients && (
        <DashboardTotals clients={listClients.data.clients} orders={dataOrders.data.orders} />
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard1;
