/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useGetUsersQuery } from "api/userApi";
import { useGetDeliveryZonesQuery } from "api/deliveryZoneApi";
import { useGetDistributorsQuery } from "api/distributorApi";
import DeliveryTruckCreate from "./DeliveryTruckCreate";

function CreateDeliveryTruck() {
  const { data: listUsers, isLoading: l1, isError: e1 } = useGetUsersQuery();
  const { data: listDeliveryZones, isLoading: l2, isError: e2 } = useGetDeliveryZonesQuery();
  const { data: ListDistributors, isLoading: l3, isError: e3 } = useGetDistributorsQuery();

  console.log(listUsers);
  console.log(listDeliveryZones);
  console.log(ListDistributors);

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
                  Nuevo Repartidor
                </MDTypography>
              </MDBox>
              <MDBox>
                {(l1 || l2 || l3) && <Loading />}
                {(e1 || e2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
                {listUsers && listDeliveryZones && ListDistributors && (
                  <DeliveryTruckCreate
                    listUsers={listUsers.data.users}
                    ListDistributors={ListDistributors.data.distributors}
                    listDeliveryZones={listDeliveryZones.data.deliveryZones}
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateDeliveryTruck;
