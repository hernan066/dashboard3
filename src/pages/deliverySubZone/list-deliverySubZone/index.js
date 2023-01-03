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
import { useGetDeliveryZonesQuery } from "api/deliveryZoneApi";
import { useGetDeliverySubZonesQuery } from "api/deliverySubZoneApi";
import TableListDeliverySubZone from "./TableListDeliverySubZone";

function ListDeliverySubZone() {
  const { data: zones, isLoading: l1, isError: e1 } = useGetDeliveryZonesQuery();
  const { data: subZones, isLoading: l2, isError: e2 } = useGetDeliverySubZonesQuery();
  console.log(subZones);

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
                  Sub Zonas de reparto
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {(l1 || l2) && <Loading />}
                {(e1 || e2) && <Alert severity="error">Ha ocurrido un error</Alert>}
                {zones && subZones && (
                  <TableListDeliverySubZone
                    deliveryZones={zones.data.deliveryZones}
                    subZones={subZones.data.deliverySubZones}
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

export default ListDeliverySubZone;
