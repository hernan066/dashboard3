/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import CharBar1 from "pages/dashboard2/components/CharBar1";
import React, { useEffect, useState } from "react";
import { dateToLocalDate } from "utils/dateFormat";
import { Chart1 } from "./Chart1";
import { Chart2 } from "./Chart2";

function DashboardTotals({ dataCategory, dataCategoryByDay }) {
  const [updateDate, setUpdateDate] = useState(null);

  useEffect(() => {
    setUpdateDate(dateToLocalDate(new Date()));
  }, []);

  return (
    <MDBox py={3}>
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={4} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="warning"
              icon="inventory"
              title="Stock Cajones de Pollo"
              count={dataCategory?.stock?.actualStock || 0}
              percentage={{
                color: "secondary",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="arrow_upward"
              title="Cajones de pollo vendidos hoy"
              count={dataCategory?.totalSell?.totalQuantitySell || 0}
              color="success"
              percentage={{
                color: "success",
                amount: "",
                label: `En Reparto ${
                  dataCategory?.totalSellLocal?.totalQuantityLocalSell || 0
                }, en Local ${
                  dataCategory?.totalSellLocal?.totalQuantityLocalSell
                    ? dataCategory.totalSell.totalQuantitySell -
                      dataCategory.totalSellLocal.totalQuantityLocalSell
                    : dataCategory?.totalSell?.totalQuantitySell || 0
                }`,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="error"
              icon="arrow_downward"
              title="Cajones de pollo comprados hoy"
              count={dataCategory?.totalBuy?.buyToday || 0}
              percentage={{
                color: "success",
                amount: "",
                label: `Actualizado ${updateDate}hs`,
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <MDBox mb={3}>
              <Chart1 dataCategoryByDay={dataCategoryByDay} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={3}>
              <Chart2 dataCategoryByDay={dataCategoryByDay} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default DashboardTotals;
