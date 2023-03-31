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
import { usePostTotalOrderProductsByRangeMutation } from "api/reportApi";
import { LoadingButton } from "@mui/lab";
import colors from "assets/theme/base/colors";
import TableReportProductsByRange from "./Table";

function ReportProductsByRange() {
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [endDate, setEndDate] = useState(new Date().setHours(23, 59, 59, 0));
  const [updateDate, setUpdateDate] = useState(null);
  const [reports, setReports] = useState([]);

  const [createOfert, { isLoading, isError }] = usePostTotalOrderProductsByRangeMutation();

  const totalCost = reports.reduce((acc, curr) => curr.totalCost + acc, 0);
  const totalSell = reports.reduce((acc, curr) => curr.total + acc, 0);
  const totalProfits = reports.reduce((acc, curr) => curr.totalProfits + acc, 0);

  useEffect(() => {
    setUpdateDate(dateToLocalDate(new Date()));
  }, []);

  const handleSend = async () => {
    const res = await createOfert({ from: startDate, to: endDate }).unwrap();
    setReports(res.data.report);
  };
  console.log(reports);

  return (
    <Box px={3} pb={3}>
      <Box px={3}>
        <MDTypography variant="h6">Selecciona un rango de días</MDTypography>
        <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <LoadingButton
          onClick={handleSend}
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
          Generar reporte
        </LoadingButton>
      </Box>
      {reports.length > 0 && (
        <Box>
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
          <TableReportProductsByRange reports={reports} />
        </Box>
      )}
    </Box>
  );
}

export default ReportProductsByRange;
