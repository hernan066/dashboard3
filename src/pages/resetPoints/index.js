import { LoadingButton } from "@mui/lab";
import { Alert, Card, Grid } from "@mui/material";
import { usePostPointsResetMutation } from "api/pointsApi";
import colors from "assets/theme/base/colors";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Swal from "sweetalert2";

function ResetPoints() {
  const [resetPoints, { isLoading, isError }] = usePostPointsResetMutation();

  const handleReset = async () => {
    Swal.fire({
      title: "Deseas resetear los puntos?",
      text: "Este cambio no se puede revertir",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reset",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await resetPoints().unwrap();
      }
    });
  };
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
                  Resetear Puntos
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <MDTypography variant="body2">
                  Desde aquí se volverán a 0 todos los puntos de los clientes.
                </MDTypography>
                <LoadingButton
                  onClick={handleReset}
                  variant="contained"
                  loading={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    mr: 2,
                    backgroundColor: `${colors.info.main}`,
                    color: "white !important",
                  }}
                >
                  Resetar puntos
                </LoadingButton>
                {isError && (
                  <Alert severity="error">Ha ocurrido un error, puntos no reseteados</Alert>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ResetPoints;
