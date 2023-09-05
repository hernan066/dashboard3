/* eslint-disable no-unused-vars */
import MDTypography from "components/MDTypography";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Alert, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import colors from "assets/theme/base/colors";
import { usePostDeliveryOrdersMutation } from "api/reportApi";
import { useParams } from "react-router-dom";
import { repeatSum, getListProducts } from "utils/getListProductsToOrders";
import TableOrders from "./tableOrders/TableOrders";
import ListProducts from "./ListProducts";
import DeliveryCards from "./DeliveryCards";

function ReportDelivery() {
  const { id } = useParams();
  let listProducts = [];
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [endDate, setEndDate] = useState(new Date().setHours(23, 59, 59, 0));
  // const [updateDate, setUpdateDate] = useState(null);

  const [orders, setOrders] = useState([]);

  const [getOrders, { isLoading: l1, isError: e1 }] = usePostDeliveryOrdersMutation();

  const handleSend = async () => {
    const res = await getOrders({ id, date: { from: startDate, to: endDate } }).unwrap();
    console.log(res);

    setOrders(res.data.report);
  };

  if (orders.length > 0) {
    listProducts = repeatSum(getListProducts(orders));
  }

  if (e1) {
    return <Alert severity="error">Ha ocurrido un error</Alert>;
  }

  return (
    <>
      <Box px={2}>
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
          loading={l1}
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
      {orders.length > 0 && (
        <>
          <DeliveryCards orders={orders} listProducts={listProducts} />
          <ListProducts listProducts={listProducts} />
          <TableOrders orders={orders} />
        </>
      )}
    </>
  );
}

export default ReportDelivery;
