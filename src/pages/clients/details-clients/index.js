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
import { Alert } from "@mui/material";
import { useGetClientQuery } from "api/clientsApi";
import { useParams } from "react-router-dom";
import { useGetClientOrderQuery } from "api/orderApi";
import TableListOrders from "./TableListOrders";

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

  console.log(arrProductsNonDupli);
  return arrProductsNonDupli;
};

function DetailsClients() {
  const { id } = useParams();
  const { data: dataClient, isLoading: l1, error: e1 } = useGetClientQuery(id);
  const { data: dataOrders, isLoading: l2, error: e2 } = useGetClientOrderQuery(id);
  const [listProducts, setListProducts] = useState(null);
  const [listTopProducts, setListTopProducts] = useState(null);

  useEffect(() => {
    if (dataOrders) {
      setListProducts(getListProducts(dataOrders.data.orders));
    }
  }, [dataOrders]);

  useEffect(() => {
    if (listProducts) {
      setListTopProducts(listProducts);
    }
  }, [listProducts]);

  console.log(dataClient);
  console.log(dataOrders);
  console.log(listProducts);
  console.log(listTopProducts);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
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
                  Detalle cliente
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {(l1 || l2) && <Loading />}
                {(e1 || e2) && <Alert severity="error">ha ocurrido un error</Alert>}
                {dataClient && dataOrders && listTopProducts && (
                  <TableListOrders
                    orders={dataOrders}
                    client={dataClient.data.client}
                    listTopProducts={listTopProducts}
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailsClients;
