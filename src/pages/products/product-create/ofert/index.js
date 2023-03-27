import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useGetProductsQuery } from "api/productApi";

import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import OfertCreate from "./OfertCreate";

function CreateOfert() {
  const { data: listProducts, isLoading, error } = useGetProductsQuery();

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
                  Crear nueva oferta
                </MDTypography>
              </MDBox>
              <MDBox>
                {isLoading && <Loading />}
                {error && <Alert severity="error">{error.error}</Alert>}
                {listProducts && <OfertCreate listProducts={listProducts} />}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateOfert;
