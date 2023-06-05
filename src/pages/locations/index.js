/* eslint-disable import/no-extraneous-dependencies */
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
import { useGetClientAddressesQuery } from "api/clientsAddressApi";
import { useLoadScript } from "@react-google-maps/api";
import MapsLocations from "./MapsLocations";

function LocationsPage() {
  const { data, isLoading, error } = useGetClientAddressesQuery();
  console.log(data);
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places"],
  });

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
                  Localizaciones
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading && !isLoaded && <Loading />}
                {error && <Alert severity="error">Ha ocurrido un error</Alert>}
                {data && <MapsLocations clientAddress={data.data.clientAddress} />} 
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default LocationsPage;
