/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */

import { Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export function DataClient({ client }) {
  return (
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
      <MDTypography variant="h5">Datos del cliente </MDTypography>
      <Divider />
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Nombre: </MDTypography>
        <MDTypography variant="body2">
          {client.user.name} {client.user.lastName}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Email: </MDTypography>
        <MDTypography variant="body2">{client.user.email}</MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Teléfono: </MDTypography>
        <MDTypography variant="body2">{client.user.phone}</MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Tipo de cliente: </MDTypography>
        <MDTypography variant="body2">{client.clientType.clientType}</MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Categoría de cliente: </MDTypography>
        <MDTypography variant="body2">{client.clientCategory.clientCategory}</MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Estado: </MDTypography>
        <MDTypography variant="body2" sx={{ color: "blue", fontWeight: 800 }}>
          {client?.active ? "ACTIVO" : "INACTIVO"}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}
