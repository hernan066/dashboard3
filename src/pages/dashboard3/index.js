/* eslint-disable no-unused-vars */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useGetCategoryReportQuery, useGetCategoryReportByDayQuery } from "api/reportApi";
import DashboardTotals from "./components/DashboardTotals";

function Dashboard3() {
  const {
    data: dataCategory,
    isLoading: l1,
    isError: e1,
  } = useGetCategoryReportQuery("cajon de pollos");
  const {
    data: dataCategoryByDay,
    isLoading: l2,
    isError: e2,
  } = useGetCategoryReportByDayQuery("cajon de pollos");

  console.log(dataCategoryByDay);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {(l1 || l2) && <Loading />}
      {(e1 || e1) && <Alert severity="error">Ha ocurrido un error</Alert>}
      {dataCategory && dataCategoryByDay && (
        <DashboardTotals
          dataCategory={dataCategory.data.report}
          dataCategoryByDay={dataCategoryByDay.data.report}
        />
      )}
    </DashboardLayout>
  );
}

export default Dashboard3;
