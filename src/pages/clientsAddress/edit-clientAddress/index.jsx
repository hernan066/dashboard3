/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useGetClientsQuery } from "api/clientsApi";
import { useGetDeliveryZonesQuery } from "api/deliveryZoneApi";
import { useGetClientAddressQuery } from "api/clientsAddressApi";
import { useParams } from "react-router-dom";
import ClientAddressEdit from "./ClientAddressEdit";

function EditClientAddress() {
  const { id } = useParams();
  const { data: clients, isLoading: l1, isError: e1 } = useGetClientsQuery();
  const { data: zones, isLoading: l2, isError: e2 } = useGetDeliveryZonesQuery();
  const { data: clientAddress, isLoading: l3, isError: e3 } = useGetClientAddressQuery(id);

  console.log(clientAddress);

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
                  Editar dirección de cliente
                </MDTypography>
              </MDBox>
              <MDBox>
                {(l1 || l2 || l3) && <Loading />}
                {(e1 || e2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
                {clients && zones && clientAddress && (
                  <ClientAddressEdit
                    clients={clients.data.clients}
                    zones={zones.data.deliveryZones}
                    clientAddress={clientAddress.data.clientAddress}
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

export default EditClientAddress;
