/* eslint-disable no-unused-vars */
import { Alert, Grid } from "@mui/material";
import { useGetClientAddressesQuery } from "api/clientsAddressApi";
import { useGetDeliveryTrucksQuery } from "api/deliveryTruckApi";
import { useGetDeliveryZonesQuery } from "api/deliveryZoneApi";
import { useGetOfertsQuery } from "api/ofertApi";
import Loading from "components/DRLoading";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CreateOrder from "./CreateOrder";

function OrderCreate() {
  const { data: oferts, isLoading: l1, isError: e1 } = useGetOfertsQuery();
  const { data: clientAddresses, isLoading: l2, isError: e2 } = useGetClientAddressesQuery();
  const { data: zones, isLoading: l3, isError: e3 } = useGetDeliveryZonesQuery();
  const { data: deliveryTrucks, isLoading: l4, isError: e4 } = useGetDeliveryTrucksQuery();

  // console.log(zones);
  console.log(clientAddresses);

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
              {(l1 || l2 || l3 || l4) && <Loading />}
              {(e1 || e2 || e3 || e4) && <Alert severity="error">Ha ocurrido un error</Alert>}
              {oferts && clientAddresses && zones && deliveryTrucks && (
                <CreateOrder
                  oferts={oferts}
                  clientAddresses={clientAddresses.data.orderClientAddress}
                  zones={zones.data.deliveryZones}
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

export default OrderCreate;
