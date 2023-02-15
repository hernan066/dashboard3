import { Alert, Grid } from "@mui/material";
import { useGetDeliveryTrucksQuery } from "api/deliveryTruckApi";
import { useGetDeliveryZonesQuery } from "api/deliveryZoneApi";
import { useGetOrderQuery } from "api/orderApi";
import Loading from "components/DRLoading";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from "react-router-dom";
import Details from "./Details";

function OrderEdit() {
  const { id } = useParams();

  const { data: order, isLoading: l1, isError: e1 } = useGetOrderQuery(id);
  const { data: deliveryZones, isLoading: l2, isError: e2 } = useGetDeliveryZonesQuery();
  const { data: deliveryTrucks, isLoading: l3, isError: e3 } = useGetDeliveryTrucksQuery();

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
              {(l1 || l2 || l3) && <Loading />}
              {(e1 || e2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
              {order && deliveryZones && deliveryTrucks && (
                <Details
                  order={order.data.order}
                  deliveryZones={deliveryZones.data.deliveryZones}
                  deliveryTrucks={deliveryTrucks.data.deliveryTrucks}
                />
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default OrderEdit;
