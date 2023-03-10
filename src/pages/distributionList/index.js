/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useGetOrdersActiveQuery } from "api/orderApi";
import { useGetProductsLotsQuery } from "api/productsLotsApi";
import DistributionList from "./DistributionList";




function ListDistribution() {
  const { data: listOrders, isLoading: l1, error: e1 } = useGetOrdersActiveQuery();
  const { data: listStock, isLoading: l2, error: e2 } = useGetProductsLotsQuery()

  // console.log(listOrders);
  // console.log(listStock);

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
                  Lista de reparto
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {(l1 || l2) && <Loading />}
                {(e1 || e2) && <Alert severity="error">Ha ocurrido un error</Alert>}
               {listOrders && listStock &&  <DistributionList orders={listOrders.data.orders} stock={listStock.data.productLots} />}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ListDistribution;
