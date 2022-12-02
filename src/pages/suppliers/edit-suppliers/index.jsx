/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useGetSupplierQuery } from "api/supplierApi";
import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import Loading from "components/DRLoading";
import SupplierEdit from "./SupplierEdit";

function EditSupplier() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSupplierQuery(id);

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
                  Editar proveedor
                </MDTypography>
              </MDBox>
              <MDBox>
                {isLoading && <Loading />}
                {isError && <Alert severity="error">Ha ocurrido un error</Alert>}
                {data && <SupplierEdit supplier={data.data.supplier} />}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default EditSupplier;
