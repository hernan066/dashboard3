/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */

import { Avatar, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";

export function RecAndPoints({ client, recommendation }) {
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
      <MDTypography variant="h5">Puntos y recomendaciones</MDTypography>
      <Divider />
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Puntos: </MDTypography>
        <MDTypography variant="body2">{client?.points || 0}</MDTypography>
      </MDBox>
      <Divider />
      <MDBox sx={{ padding: "10px 0" }}>
        <MDTypography variant="h6">Recomendaciones</MDTypography>
      </MDBox>
      {recommendation.length === 0 && (
        <MDTypography variant="h6" sx={{ color: "#ccc" }}>
          (Ninguna)
        </MDTypography>
      )}
      {recommendation.map((recommendedClient) => (
        <MDBox
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px 0",
          }}
        >
          <MDBox sx={{ display: "flex", gap: 3, alignItems: "center", width: "50%" }}>
            <Avatar src={recommendedClient?.recommendedUser?.avatar} />
            <Link to={`/clientes/detalle/${recommendedClient.recommendedClient}`}>
              <MDTypography variant="body2" sx={{ color: "blue" }}>
                {recommendedClient.recommendedUser.name}{" "}
                {recommendedClient.recommendedUser.lastName}
              </MDTypography>
            </Link>
          </MDBox>

          <MDTypography variant="body2">{recommendedClient.points || 0}</MDTypography>
        </MDBox>
      ))}
    </MDBox>
  );
}
