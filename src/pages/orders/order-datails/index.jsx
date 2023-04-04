import { Alert, Grid } from "@mui/material";
import { useGetOrderQuery } from "api/orderApi";
import Loading from "components/DRLoading";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from "react-router-dom";
import Details from "./Details";

function OrderDetails() {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderQuery(id);

  console.log(order?.data.order);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
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
                Detalle de orden
              </MDTypography>
            </MDBox>
            <MDBox pt={3} px={2}>
              {isLoading && <Loading />}
              {error && <Alert severity="error">Ha ocurrido un error</Alert>}
              {order && <Details order={order} />}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default OrderDetails;
