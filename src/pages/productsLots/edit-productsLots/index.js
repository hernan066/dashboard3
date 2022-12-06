/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useGetProductsQuery } from "api/productApi";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useGetSuppliersQuery } from "api/supplierApi";
import { useGetProductsLotQuery } from "api/productsLotsApi";
import { useParams } from "react-router-dom";
import ProductsLotsEdit from "./ProductsLotsEdit";

function EditProductsLots() {
  const { id } = useParams();
  const { data: listProducts, isLoading: l1, isError: e1 } = useGetProductsQuery();
  const { data: ListSuppliers, isLoading: l2, isError: e2 } = useGetSuppliersQuery();
  const { data: productLot, isLoading: l3, isError: e3 } = useGetProductsLotQuery(id);

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
                  Editar Lote de Productos
                </MDTypography>
              </MDBox>
              <MDBox>
                {(l1 || l2 || l3) && <Loading />}
                {(e1 || e2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
                {listProducts && ListSuppliers && productLot && (
                  <ProductsLotsEdit
                    listProducts={listProducts}
                    ListSuppliers={ListSuppliers}
                    productLot={productLot}
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

export default EditProductsLots;
