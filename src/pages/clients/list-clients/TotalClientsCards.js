/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import { Box, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useEffect, useState } from "react";
import { dateToLocalDate } from "utils/dateFormat";
import { formatQuantity } from "utils/quantityFormat";

function TotalClientsCards({ clients }) {
  const activeClients = clients.filter((client) => client.active).length;
  const [updateDate, setUpdateDate] = useState(null);
  useEffect(() => {
    setUpdateDate(dateToLocalDate(new Date()));
  }, []);

  const clientType1 = clients.filter(
    (client) => client.clientType.clientType === "Consumidor final"
  );
  const clientType1Active = clientType1.filter((client) => client.active).length;

  const clientType2 = clients.filter((client) => client.clientType.clientType === "Minorista");
  const clientType2Active = clientType2.filter((client) => client.active).length;

  const clientType3 = clients.filter((client) => client.clientType.clientType === "Mayorista");
  const clientType3Active = clientType3.filter((client) => client.active).length;

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Total de clientes"
              count={clients.length}
              percentage={{
                color: "success",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="secondary"
              icon="person_add"
              title="Clientes Activos"
              count={activeClients}
              percentage={{
                color: "success",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="info"
              icon="person_add"
              title="Clientes Activos %"
              count={`${formatQuantity((activeClients * 100) / clients.length)}%`}
              percentage={{
                color: "success",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
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
              icon="person_add"
              title="Consumidores finales"
              count={clientType1.length}
              percentage={{
                color: "success",
                amount: "",
                label: `Activos ${clientType1Active} (${formatQuantity(
                  (clientType1Active * 100) / clientType1.length
                )}%)`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="warning"
              icon="person_add"
              title="Minoristas"
              count={clientType2.length}
              percentage={{
                color: "success",
                amount: "",
                label: `Activos ${clientType2Active} (${formatQuantity(
                  (clientType2Active * 100) / clientType2.length
                )}%)`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="error"
              icon="person_add"
              title="Mayoristas"
              count={clientType3.length}
              percentage={{
                color: "success",
                amount: "",
                label: `Activos ${clientType3Active} (${formatQuantity(
                  (clientType3Active * 100) / clientType3.length
                )}%)`,
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TotalClientsCards;

/*  */
