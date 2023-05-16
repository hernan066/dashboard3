/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert, Box, Tab, Tabs } from "@mui/material";
import { useGetClientQuery } from "api/clientsApi";
import { useParams } from "react-router-dom";
import { useGetClientOrderQuery } from "api/orderApi";
import {
  useGetReportTotalClientBuyIndividualQuery,
  useGetReportTotalClientBuyIndividualByDayQuery,
} from "api/reportApi";
import { useGetAllRecommendationByClientQuery } from "api/recommnedationApi";
import ResumeDataClient from "./ResumeDataClient";
import RedeemPoints from "./redeemPoints/RedeemPoints";
import EditClient from "./editClient";
import EditClientAddress from "./editAddress";
import HistoryPoints from "./historyPoints";

const getListProducts = (orders) => {
  const listOfProducts = orders.map((product) => product.orderItems);

  const list = [];
  for (let i = 0; i < listOfProducts.length; i++) {
    const element = listOfProducts[i];
    for (let x = 0; x < element.length; x++) {
      list.push(element[x]);
    }
  }

  return list;
};

const repeatSum = (arr) => {
  const arrProductsNonDupli = [];
  const arrProductsIdCounted = [];
  arr.forEach((product, indxA, arrProducts) => {
    // validar si el product ya fue contado en la busqueda de duplicados
    const isCountryCounted = arrProductsIdCounted.includes(product.productId);
    // Si no ha sido contado
    if (!isCountryCounted) {
      arrProductsIdCounted.push(product.productId);

      // Buscar cuantas coincidencias existen del product en el array
      const countriesToCount = arrProducts.filter((ele) => ele.productId === product.productId);

      const country =
        countriesToCount.length > 1
          ? {
              ...product,
              totalQuantity: countriesToCount.reduce((acc, cur) => acc + cur.totalQuantity, 0),
              totalPrice: countriesToCount.reduce((acc, cur) => acc + cur.totalPrice, 0),
            }
          : product;

      arrProductsNonDupli.push(country);
    }
  });

  return arrProductsNonDupli;
};

function DetailsClients() {
  const { id } = useParams();

  const [page, setPage] = useState(0);

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  const { data: dataClient, isLoading: l1, error: e1 } = useGetClientQuery(id);
  const { data: dataOrders, isLoading: l2, error: e2 } = useGetClientOrderQuery(id);
  const {
    data: dataClientBuy,
    isLoading: l3,
    error: e3,
  } = useGetReportTotalClientBuyIndividualQuery(id);

  const {
    data: dataClientBuyByDay,
    isLoading: l4,
    error: e4,
  } = useGetReportTotalClientBuyIndividualByDayQuery(id);

  const {
    data: recommendationData,
    isLoading: l5,
    error: e5,
  } = useGetAllRecommendationByClientQuery(id);

  const [listProducts, setListProducts] = useState(null);
  const [listTopProducts, setListTopProducts] = useState(null);

  useEffect(() => {
    if (dataOrders) {
      setListProducts(getListProducts(dataOrders.data.orders));
    }
  }, [dataOrders]);

  useEffect(() => {
    if (listProducts) {
      setListTopProducts(repeatSum(listProducts));
    }
  }, [listProducts]);
  console.log(dataClient);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Cliente {dataClient?.data?.client?.user.name || ""}{" "}
                {dataClient?.data?.client?.user.lastName || ""}
              </MDTypography>
            </MDBox>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                width: "100%",
                flexDirection: "column",
                px: 2,
                my: 2,
              }}
            >
              <Tabs value={page} onChange={handleChange} centered>
                <Tab label="Datos del cliente" />
                <Tab label="Editar cliente" />
                <Tab label="Editar dirección" />
                <Tab label="Canjear puntos" />
                <Tab label="Historial de puntos" />
              </Tabs>
            </Box>
            {page === 0 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {(l1 || l2 || l3 || l4 || l5) && <Loading />}
                {(e1 || e2 || e3 || e4 || e5) && (
                  <Alert severity="error">ha ocurrido un error</Alert>
                )}
                {dataClient &&
                  dataOrders &&
                  listTopProducts &&
                  dataClientBuy &&
                  dataClientBuyByDay &&
                  recommendationData && (
                    <Box m="20px">
                      <ResumeDataClient
                        client={dataClient.data.client}
                        listOrders={dataOrders.data.orders}
                        listTopProducts={listTopProducts}
                        clientBuy={dataClientBuy.data?.report[0]}
                        dataClientBuyByDay={dataClientBuyByDay.data.report}
                        recommendation={recommendationData.data.recommendation}
                        orders={dataOrders}
                      />
                    </Box>
                  )}
              </Card>
            )}
            {page === 1 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                <EditClient />
              </Card>
            )}
            {page === 2 && (
              <Box
                sx={{
                  mx: 2.5,
                }}
              >
                <EditClientAddress  client={dataClient.data.client}/>
              </Box>
            )}
            {page === 3 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                <RedeemPoints />
              </Card>
            )}
            {page === 4 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                <HistoryPoints />
              </Card>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailsClients;
