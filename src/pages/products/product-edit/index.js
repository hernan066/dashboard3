/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useGetCategoriesQuery } from "api/categoryApi";
import Loading from "components/DRLoading";
import { Alert, Box, Tab, Tabs } from "@mui/material";
import { useGetProductQuery, useGetProductOfertQuery } from "api/productApi";
import { useGetSuppliersQuery } from "api/supplierApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetTotalIndividualProductQuery,
  useGetTotalIndividualProductLast30DaysQuery,
} from "api/reportApi";
import ProductEdit from "./dataEdit/ProductEdit";
import OfertEdit from "./ofertEdit/OfertEdit";
import TableStock from "./stockEdit/TableStock";
import OfertCreate from "../product-create/ofert/OfertCreate";
import ProductsLotsCreate from "./stockAdd/ProductsLotsCreate";
import DataProduct from "./productData/DataProduct";

function EditProduct() {
  const { id } = useParams();
  const [page, setPage] = useState(0);

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  const { data: categoryData, isLoading: l1, error: e1 } = useGetCategoriesQuery();
  const { data: productById, isLoading: l2, error: e2 } = useGetProductQuery(id);

  const { data: ListSuppliers, isLoading: l3, isError: e3 } = useGetSuppliersQuery();
  // oferta

  const { data: ofertById, isLoading: l4, error: e4 } = useGetProductOfertQuery(id);

  const {
    data: totalProductSell,
    isLoading: l5,
    error: e5,
  } = useGetTotalIndividualProductQuery({ id });
  const {
    data: totalProductSellLast30Days,
    isLoading: l6,
    error: e6,
  } = useGetTotalIndividualProductLast30DaysQuery({ id });

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
                {productById?.name || ""}
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
                <Tab label="Datos del producto" />
                <Tab label="Editar datos" />
                <Tab label="Editar oferta" />
                <Tab label="Agregar Stock" />
                <Tab label="Lista de stock" />
              </Tabs>
            </Box>

            {page === 0 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {(l2 || l4 || l5 || l6) && <Loading />}
                {(e2 || e4 || e5 || e6) && <Alert severity="error">Ha ocurrido un error</Alert>}
                {productById && ofertById && totalProductSell && totalProductSellLast30Days && (
                  <DataProduct
                    productById={productById}
                    ofertById={ofertById.data.ofert}
                    totalProductSell={totalProductSell.data.report}
                    totalProductSellLast30Days={totalProductSellLast30Days.data.report}
                  />
                )}
              </Card>
            )}
            {page === 1 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {(l1 || l2) && <Loading />}
                {(e1 || e2) && <Alert severity="error">Ha ocurrido un error</Alert>}
                {categoryData && productById && (
                  <ProductEdit listCategories={categoryData} productById={productById} />
                )}
              </Card>
            )}
            {page === 2 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {l4 && <Loading />}
                {e4 && <Alert severity="error">Ha ocurrido un error</Alert>}
                {ofertById?.data?.ofert ? (
                  <OfertEdit ofertById={ofertById} />
                ) : (
                  <OfertCreate warning />
                )}
              </Card>
            )}
            {page === 4 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {l2 && <Loading />}
                {e2 && <Alert severity="error">Ha ocurrido un error</Alert>}
                {productById && <TableStock stock={productById} />}
              </Card>
            )}
            {page === 3 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                {(l2 || l3) && <Loading />}
                {(l2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
                {ListSuppliers && productById && (
                  <ProductsLotsCreate ListSuppliers={ListSuppliers} productById={productById} />
                )}
              </Card>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default EditProduct;
