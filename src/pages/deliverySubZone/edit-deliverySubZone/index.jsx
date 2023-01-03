import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useGetDeliveryZonesQuery } from "api/deliveryZoneApi";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useGetDeliverySubZoneQuery } from "api/deliverySubZoneApi";
import { useParams } from "react-router-dom";
import DeliverySubZoneEdit from "./DeliverySubZoneCreate";

function EditDeliverySubZone() {
  const { id } = useParams();
  const { data: zones, isLoading: l1, isError: e1 } = useGetDeliveryZonesQuery();
  const { data: subZone, isLoading: l2, isError: e2 } = useGetDeliverySubZoneQuery(id);
  console.log(subZone);
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
                  Editar subZona de reparto
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDBox pt={3}>
                  {(l1 || l2) && <Loading />}
                  {(e1 || e2) && <Alert severity="error">Ha ocurrido un error</Alert>}
                  {zones && subZone && (
                    <DeliverySubZoneEdit
                      deliveryZones={zones.data.deliveryZones}
                      deliverySubZone={subZone.data.deliverySubZone}
                    />
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default EditDeliverySubZone;
