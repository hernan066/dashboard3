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
import { useGetClientQuery } from "api/clientsApi";
import { useParams } from "react-router-dom";
import { useGetClientOrderQuery } from "api/orderApi";
import TableListOrders from "./TableListOrders";

function DetailsClients() {
  const { id } = useParams();
  const { data: dataClient, isLoading: l1, error: e1 } = useGetClientQuery(id);
  const { data: dataOrders, isLoading: l2, error: e2 } = useGetClientOrderQuery(id);

  console.log(dataClient);
  console.log(dataOrders);

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
                  Detalle cliente
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                
                {(l1 || l2) && <Loading />}
                {(e1 || e2) && <Alert severity="error">ha ocurrido un error</Alert>}
                {dataClient && dataOrders && <TableListOrders orders={dataOrders} client={dataClient.data.client}/>}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailsClients;
