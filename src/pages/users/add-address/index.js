import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import MDButton from "components/MDButton";
import { useState } from "react";
import { useGetUserQuery } from "api/userApi";
import { useParams } from "react-router-dom";
import AddAddress from "./AddUserAddress";

function AddUserAddress() {
  const { id } = useParams();
  const { data: user, isLoading: l1, isError: e1 } = useGetUserQuery(id);
  const [newAddress, setNewAddress] = useState(false);
  console.log(user);

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
                Manejo de direcciones
              </MDTypography>
            </MDBox>
            <MDButton
              color="dark"
              variant="gradient"
              sx={{
                margin: "18px 18px 0 18px",
              }}
              onClick={() => setNewAddress(true)}
            >
              Nueva dirección
            </MDButton>
            <Card
              sx={{
                margin: "20px 18px",
              }}
            >
              <MDBox>
                {l1 && <Loading />}
                {e1 && <Alert severity="error">Ha ocurrido un error</Alert>}
                {user && <AddAddress user={user.data.user} />}
              </MDBox>
            </Card>
            {newAddress && (
              <Card
                sx={{
                  margin: "20px 18px",
                }}
              >
                <MDBox>
                  {l1 && <Loading />}
                  {e1 && <Alert severity="error">Ha ocurrido un error</Alert>}
                  {user && <AddAddress user={user.data.user} />}
                </MDBox>
              </Card>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddUserAddress;
