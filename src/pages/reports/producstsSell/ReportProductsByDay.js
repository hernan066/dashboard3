/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "react-datepicker/dist/react-datepicker.css";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { formatDateMonth, dateToLocalDate } from "utils/dateFormat";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { formatPrice } from "utils/formaPrice";

import TableReportProductsByDay from "./Table";

function ReportProductsByDay({ report }) {
  const [startDate, setStartDate] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(null);

  const filterReport = report.filter((item) => item.date === formatDateMonth(startDate));
  console.log(filterReport);

  const totalCost = filterReport.reduce((acc, curr) => curr.totalCost + acc, 0);
  const totalSell = filterReport.reduce((acc, curr) => curr.total + acc, 0);
  const totalProfits = filterReport.reduce((acc, curr) => curr.totalProfits + acc, 0);

  useEffect(() => {
    setUpdateDate(dateToLocalDate(new Date()));
  }, []);

  return (
    <Box px={3} pb={3}>
      <Box px={3}>
        <MDTypography variant="h6">Selecciona un dia</MDTypography>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </Box>
      <Box mt={4} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="attach_money_icon"
                title="Total cantidad facturada"
                count={formatPrice(totalSell)}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `Ultima actualización ${updateDate}hs`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="attach_money_icon"
                title="Total costo"
                count={formatPrice(totalCost)}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `Ultima actualización ${updateDate}hs`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="attach_money_icon"
                title="Total ganancia"
                count={formatPrice(totalProfits)}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `Ultima actualización ${updateDate}hs`,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </Box>
      <TableReportProductsByDay reports={filterReport} />
    </Box>
  );
}

export default ReportProductsByDay;
