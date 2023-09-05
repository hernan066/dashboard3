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
import { useGetDeliveryTruckQuery } from "api/deliveryTruckApi";
import { useParams } from "react-router-dom";
import ResumeDelivery from "./ResumeDelivery";

function DetailsDeliveryTruck() {
  const { id } = useParams();
  const { data: deliveryTruck, isLoading: l1, isError: e1 } = useGetDeliveryTruckQuery(id);
  console.log(deliveryTruck);

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
                  Detalle de repartidor
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {l1 && <Loading />}
                {e1 && <Alert severity="error">Ha ocurrido un error</Alert>}
                {deliveryTruck && (
                  <ResumeDelivery deliveryTruck={deliveryTruck.data.deliveryTruck} />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailsDeliveryTruck;
