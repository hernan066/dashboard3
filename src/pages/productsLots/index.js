/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useGetProductsQuery } from "api/productApi";
import { useGetTotalStockQuery } from "api/reportApi";
import { useGetSuppliersQuery } from "api/supplierApi";
import TableListTotalStock from "./list-total-stock/Table";
import TableListAvailableStock from "./list-available-stock/Table";
import TableListProductsLots from "./list-productsLots/TableListProductsLots";
import ProductsLotsCreate from "./create-productsLots/ProductsLotsCreate";

function StockMain() {
  const [page, setPage] = useState(0);

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  const { data: stock, isLoading: l1, error: e1 } = useGetProductsQuery();
  const { data: actualStock, isLoading: l2, error: e2 } = useGetTotalStockQuery();
  const { data: ListSuppliers, isLoading: l3, isError: e3 } = useGetSuppliersQuery();

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
                Stock de productos
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
                <Tab label="Stock disponible" />
                <Tab label="Stock total" />
                <Tab label="Historia de stock" />
                <Tab label="Agregar stock" />
              </Tabs>
            </Box>
            {page === 0 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {l1 && <Loading />}
                {e1 && <Alert severity="error">Ha ocurrido un error</Alert>}
                {stock && <TableListAvailableStock products={stock.products} />}
              </Card>
            )}
            {page === 1 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {l2 && <Loading />}
                {e2 && <Alert severity="error">Ha ocurrido un error</Alert>}
                {stock && <TableListTotalStock actualStock={actualStock.data.report} />}
              </Card>
            )}
            {page === 2 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {l1 && <Loading />}
                {e1 && <Alert severity="error">Ha ocurrido un error</Alert>}
                {stock && <TableListProductsLots products={stock.products} />}
              </Card>
            )}
            {page === 3 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {(l1 || l3) && <Loading />}
                {(e1 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
                {stock && ListSuppliers && (
                  <ProductsLotsCreate listProducts={stock} ListSuppliers={ListSuppliers} />
                )}
              </Card>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default StockMain;
