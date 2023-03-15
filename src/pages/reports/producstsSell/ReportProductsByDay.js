/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "react-datepicker/dist/react-datepicker.css";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { formatDateMonth } from "utils/dateFormat";
import MDTypography from "components/MDTypography";
import TableReportProductsByDay from "./Table";

function ReportProductsByDay({ report }) {
  const [reportsData, setReportsData] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setReportsData(report);
  }, []);

  console.log(formatDateMonth(startDate));
  const filterReports = reportsData.filter((item) => item.date === formatDateMonth(startDate));

  return (
    <Box px={3} pb={3}>
      <Box px={3}>
        <MDTypography variant="h6">Selecciona un dia</MDTypography>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </Box>
      <TableReportProductsByDay reports={filterReports} />
    </Box>
  );
}

export default ReportProductsByDay;
