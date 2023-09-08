/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert, Box, Tab, Tabs } from "@mui/material";
import { useGetClientsQuery } from "api/clientsApi";
import { useGetReportTotalClientBuyQuery } from "api/reportApi";
import TableListClients from "./TableListClient";
import TotalClientsCards from "./TotalClientsCards";
import TableListClientsActive from "./TableListClientActive";
import TableListClientsInactive from "./TableListClientInactive";

function ListClients() {
  const { data: dataClients, isLoading: l1, isError: e1 } = useGetClientsQuery();
  const { data: dataClientsBuy, isLoading: l2, isError: e2 } = useGetReportTotalClientBuyQuery();
  console.log(dataClientsBuy);

  const [page, setPage] = useState(0);

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

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
                Clientes
              </MDTypography>
            </MDBox>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                width: "100%",
                flexDirection: "column",
                px: 2,
                my: 2,
              }}
            >
              <Tabs value={page} onChange={handleChange} centered>
                <Tab label="Lista de clientes" />
                <Tab label="Clientes activos" />
                <Tab label="Clientes inactivos" />
              </Tabs>
            </Box>
            {page === 0 && (
              <Box
                sx={{
                  mt: 4,
                }}
              >
                {l1 && <Loading />}
                {e1 && <Alert severity="error">Ha ocurrido un error</Alert>}
                {dataClients && <TotalClientsCards clients={dataClients.data.clients} />}
                <Card sx={{ margin: "0 20px" }}>
                  {dataClients && <TableListClients clients={dataClients.data.clients} />}
                </Card>
              </Box>
            )}
            {page === 1 && (
              <Box
                sx={{
                  mt: 4,
                }}
              >
                <Card sx={{ margin: "0 20px" }}>
                  {l2 && <Loading />}
                  {e2 && <Alert severity="error">Ha ocurrido un error</Alert>}
                  {dataClientsBuy && (
                    <TableListClientsActive clients={dataClientsBuy.data.report} />
                  )}
                </Card>
              </Box>
            )}
            {page === 2 && (
              <Box
                sx={{
                  mt: 4,
                }}
              >
                <Card sx={{ margin: "0 20px" }}>
                  {l2 && <Loading />}
                  {e2 && <Alert severity="error">Ha ocurrido un error</Alert>}
                  {dataClientsBuy && (
                    <TableListClientsInactive clients={dataClientsBuy.data.report} />
                  )}
                </Card>
              </Box>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ListClients;
