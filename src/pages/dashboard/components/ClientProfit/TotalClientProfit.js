/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Avatar, Divider } from "@mui/material";
import { formatPrice } from "utils/formaPrice";

function TotalClientsProfits({ clients }) {
  const sliceClients = clients
    .slice(0, 13)
    .filter((client) => client.name !== "consumidor " && client.name !== "Caleb")
    .sort((a, b) => b.totalProfits - a.totalProfits);
  return (
    <Card>
      <MDBox sx={{ flex: 1, padding: 3 }}>
        <MDTypography variant="h6"> Top 12 Clientes que dejan mas ganancia</MDTypography>
        <MDTypography variant="button" fontWeight="regular" color="text">
          Desde el 21/03/2023
        </MDTypography>
        <Divider />

        {sliceClients.map((client) => (
          <MDBox
            mb={1}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MDBox sx={{ display: "flex", gap: 3, alignItems: "center", width: "75%" }}>
              <Avatar src={client?.img} />
              <MDTypography variant="body2">
                {client.name} {client.lastName}
              </MDTypography>
            </MDBox>

            <MDTypography variant="body2" mr={1} sx={{ width: "25%", textAlign: "right" }}>
              {formatPrice(client?.totalProfits)}
            </MDTypography>
          </MDBox>
        ))}
      </MDBox>
    </Card>
  );
}

export default TotalClientsProfits;
