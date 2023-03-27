import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useGetCategoriesQuery } from "api/categoryApi";
import { useGetSuppliersQuery } from "api/supplierApi";
import Loading from "components/DRLoading";
import { Alert, Box, Tab, Tabs } from "@mui/material";
import { useGetProductsQuery } from "api/productApi";
import ProductCreate from "./product/ProductCreate";
import OfertCreate from "./ofert/OfertCreate";
import ProductsLotsCreate from "./stock/ProductsLotsCreate";

function CreateProduct() {
  const [page, setPage] = useState(0);

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };
  const { data: listCategories, isLoading: l1, error: e1 } = useGetCategoriesQuery();
  const { data: listProducts, isLoading: l2, error: e2 } = useGetProductsQuery();
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
                Cargar datos de nuevo producto
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
                <Tab label="Crear producto" />
                <Tab label="Crear oferta" />
                <Tab label="Cargar stock" />
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
                {listCategories && <ProductCreate listCategories={listCategories} />}
              </Card>
            )}
            {page === 1 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                <OfertCreate />
              </Card>
            )}
            {page === 2 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {(l2 || l3) && <Loading />}
                {(e2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
                {listProducts && ListSuppliers && (
                  <ProductsLotsCreate listProducts={listProducts} ListSuppliers={ListSuppliers} />
                )}
              </Card>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateProduct;
