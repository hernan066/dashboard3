/* eslint-disable no-unused-vars */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useGetOrdersByDaysQuery } from "api/orderApi";
import { useGetClientsQuery } from "api/clientsApi";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import {
  useGetTotalOrdersQuery,
  usePostReportSellByRangeDayMutation,
  useGetTotalOrdersProductsQuery,
  useGetTotalOrdersProducts2103Query,
} from "api/reportApi";
import { useEffect, useState } from "react";
import DashboardTotals from "./components/OrdersOverview/DashboardTotals";

function Dashboard1() {
  const [report1, setReport1] = useState(null);

  const { data: dataOrders, isLoading: l1, isError: e1 } = useGetTotalOrdersQuery();
  const { data: listClients, isLoading: l2, isError: e2 } = useGetClientsQuery();
  const { data: dataOrdersByDays, isLoading: l3, isError: e3 } = useGetOrdersByDaysQuery(7);
  const [getTotalSellByRangeDay, { isLoading: l4, isError: e4 }] =
    usePostReportSellByRangeDayMutation();
  const { data: dataOrdersProducts, isLoading: l5, isError: e5 } = useGetTotalOrdersProductsQuery();
  const {
    data: dataOrdersProducts2103,
    isLoading: l6,
    isError: e6,
  } = useGetTotalOrdersProducts2103Query();

  useEffect(() => {
    const getData = async () => {
      const from = new Date(new Date().setDate(new Date().getDate() - 14));
      const to = new Date();

      const { data } = await getTotalSellByRangeDay({ from, to }).unwrap();

      setReport1(data.report);
    };
    getData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {(l1 || l2 || l3 || l4 || l5 || l6) && <Loading />}
      {(e1 || e2 || e3 || e4 || e5 || l6) && <Alert severity="error">Ha ocurrido un error</Alert>}
      {dataOrders &&
        listClients &&
        dataOrdersByDays &&
        report1 &&
        dataOrdersProducts &&
        dataOrdersProducts2103 && (
          <DashboardTotals
            clients={listClients.data.clients}
            orders={dataOrders.data.report}
            ordersByDays={dataOrdersByDays.data.orders}
            reports={report1}
            totalProducts={dataOrdersProducts.data.report}
            totalProducts2103={dataOrdersProducts2103.data.report}
          />
        )}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard1;
