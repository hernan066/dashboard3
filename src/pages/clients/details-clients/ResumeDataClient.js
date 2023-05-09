/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import MDBox from "components/MDBox";

import ClientChart1 from "./chart1/ClientChar1";
import ClientChart2 from "./chart2/ClientChart2";
import { DataClient } from "./dataClient/DataClient";
import { RecAndPoints } from "./recommendationAndPoints/RecAndPoints";
import { DataOrders } from "./dataOrders/DataOrders";
import { TopProductsBuy } from "./topProductsBuy/TopProductsBuy";
import TableListOrders from "./tableOrders/TableList";

function ResumeDataClient({
  client,
  listOrders,
  listTopProducts,
  clientBuy,
  dataClientBuyByDay,
  recommendation,
  orders,
}) {
  return (
    <>
      <MDBox sx={{ display: "flex", gap: 5 }}>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <DataClient client={client} />
          <RecAndPoints client={client} recommendation={recommendation} />
        </Box>
        <DataOrders listOrders={listOrders} clientBuy={clientBuy} />
      </MDBox>

      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ClientChart1 dataClientBuyByDay={dataClientBuyByDay} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ClientChart2 dataClientBuyByDay={dataClientBuyByDay} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      <TopProductsBuy listTopProducts={listTopProducts} />
      <TableListOrders orders={orders.data.orders} />
    </>
  );
}

export default ResumeDataClient;
