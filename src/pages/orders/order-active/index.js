/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useGetOrdersQuery } from "api/orderApi";
import TableList from "../componets/TableList";

function ListOrdersActive() {
  const { data: listOrders, isLoading, error } = useGetOrdersQuery();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (listOrders?.ok) {
      const filterOrders = listOrders?.data?.orders.filter((order) => order.active === true);
      setOrders(filterOrders);
    }
  }, [listOrders]);
  console.log(listOrders)
  console.log(orders);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Ordenes activas
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading && <Loading />}
                {error && <Alert severity="error">{error.error}</Alert>}
                {orders && <TableList orders={orders} />}
              </MDBox> 
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ListOrdersActive;
