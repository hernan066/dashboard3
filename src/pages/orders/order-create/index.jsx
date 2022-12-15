import { Alert, Grid } from "@mui/material";
import { useGetOfertsQuery } from "api/ofertApi";
import { useGetUsersQuery } from "api/userApi";
import Loading from "components/DRLoading";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CreateOrder from "./CreateOrder";

function OrderCreate() {
  const { data: oferts, isLoading: l1, isError: e1 } = useGetOfertsQuery();
  const { data: users, isLoading: l2, isError: e2 } = useGetUsersQuery();

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
                Detalle de orden
              </MDTypography>
            </MDBox>
            <MDBox pt={3} px={2}>
              {(l1 || l2) && <Loading />}
              {(e1 || e2) && <Alert severity="error">Ha ocurrido un error</Alert>}
              {oferts && users && <CreateOrder oferts={oferts} users={users.data.users} />}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default OrderCreate;
