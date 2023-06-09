/* eslint-disable no-unused-vars */
import { Box, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { formatQuantity } from "utils/quantityFormat";

function TotalsCards({ clientAddress }) {
  const filterClientAddress = clientAddress.filter((client) => client.lat);

  console.log(filterClientAddress);

  const zone1 = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 1"
  ).length;

  const zone2 = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 2"
  ).length;

  const zone3 = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 3"
  ).length;

  const zone4 = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 4"
  ).length;

  const zone5 = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 5"
  ).length;

  const zone6 = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 6"
  ).length;

  const zone1Active = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 1" && client.client.active
  ).length;

  const zone2Active = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 2" && client.client.active
  ).length;

  const zone3Active = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 3" && client.client.active
  ).length;

  const zone4Active = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 4" && client.client.active
  ).length;

  const zone5Active = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 5" && client.client.active
  ).length;

  const zone6Active = filterClientAddress.filter(
    (client) => client.deliveryZone.name === "Zona 6" && client.client.active
  ).length;

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="location_on_icon"
              title="Zona 1"
              count={zone1}
              percentage={{
                color: "success",
                amount: "",
                label: `Total direcciones activas ${zone1Active} (${formatQuantity(
                  (zone1Active * 100) / zone1
                )}%)`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="secondary"
              icon="location_on_icon"
              title="Zona 2"
              count={zone2}
              percentage={{
                color: "success",
                amount: "",
                label: `Total direcciones activas ${zone2Active} (${formatQuantity(
                  (zone2Active * 100) / zone2
                )}%)`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="info"
              icon="location_on_icon"
              title="Zona 3"
              count={zone3}
              percentage={{
                color: "success",
                amount: "",
                label: `Total direcciones activas ${zone3Active} (${formatQuantity(
                  (zone3Active * 100) / zone3
                )}%)`,
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="location_on_icon"
              title="Zona 4"
              count={zone4}
              percentage={{
                color: "success",
                amount: "",
                label: `Total direcciones activas ${zone4Active} (${formatQuantity(
                  (zone4Active * 100) / zone4
                )}%)`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="warning"
              icon="location_on_icon"
              title="Zona 5"
              count={zone5}
              percentage={{
                color: "success",
                amount: "",
                label: `Total direcciones activas ${zone5Active} (${formatQuantity(
                  (zone5Active * 100) / zone5
                )}%)`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="error"
              icon="location_on_icon"
              title="Zona 6"
              count={zone6}
              percentage={{
                color: "success",
                amount: "",
                label: `Total direcciones activas ${zone6Active} (${formatQuantity(
                  (zone6Active * 100) / zone6
                )}%)`,
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TotalsCards;

/*  */
