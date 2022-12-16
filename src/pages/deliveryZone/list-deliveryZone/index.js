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
import TableListDeliveryZone from "./TableListDeliveryZone";

function ListDeliveryZone() {
  const { data, isLoading, isError } = useGetDeliveryZonesQuery();
  console.log(data);

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
                  Zonas de reparto
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading && <Loading />}
                {isError && <Alert severity="error">Ha ocurrido un error</Alert>}
                {data && <TableListDeliveryZone deliveryZones={data.data.deliveryZones} />}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ListDeliveryZone;
