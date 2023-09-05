import { Divider, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ReportDelivery from "./ReportDelivery";

function ResumeDelivery({ deliveryTruck }) {
  return (
    <MDBox p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox
            mb={5}
            sx={{
              flex: 1,
              border: "1px solid #ccc",
              borderRadius: 1,
              padding: 2,
              alignSelf: "flex-start",
            }}
          >
            <MDTypography variant="h5">Datos del repartidor </MDTypography>
            <Divider />
            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">ID Repartidor: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.truckId}</MDTypography>
            </MDBox>
            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">Nombre: </MDTypography>
              <MDTypography variant="body2">
                {deliveryTruck.user.name} {deliveryTruck.user.lastName}
              </MDTypography>
            </MDBox>
            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">Email: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.user.email}</MDTypography>
            </MDBox>
            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">Teléfono: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.user.phone}</MDTypography>
            </MDBox>
            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">Patente vehículo: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.patent}</MDTypography>
            </MDBox>

            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">Carga maxima: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.maximumLoad} kg</MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox
            mb={5}
            sx={{
              flex: 1,
              border: "1px solid #ccc",
              borderRadius: 1,
              padding: 2,
              alignSelf: "flex-start",
            }}
          >
            <MDTypography variant="h5">Datos de la distribuidora </MDTypography>
            <Divider />
            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">Razón social / Nombre: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.distributor.businessName}</MDTypography>
            </MDBox>
            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">Teléfono: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.distributor.phone}</MDTypography>
            </MDBox>
            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">Dirección: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.distributor.address}</MDTypography>
            </MDBox>
            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">Provincia: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.distributor.city}</MDTypography>
            </MDBox>
            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">Ciudad: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.distributor.city}</MDTypography>
            </MDBox>

            <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <MDTypography variant="h6">CP: </MDTypography>
              <MDTypography variant="body2">{deliveryTruck.distributor.zip}</MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
      <ReportDelivery />
    </MDBox>
  );
}

export default ResumeDelivery;
