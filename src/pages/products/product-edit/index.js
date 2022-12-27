import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useGetCategoriesQuery } from "api/categoryApi";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useGetProductQuery } from "api/productApi";
import { useParams } from "react-router-dom";
import ProductEdit from "./ProductEdit";

function EditProduct() {
  const { id } = useParams();

  const { data: listCategories, isLoading, error } = useGetCategoriesQuery();
  const {
    data: productById,
    isLoading: isLoadingProduct,
    error: errorProduct,
  } = useGetProductQuery(id);

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
                  Editar producto
                </MDTypography>
              </MDBox>
              <MDBox>
                {(isLoading || isLoadingProduct) && <Loading />}
                {(error || errorProduct) && <Alert severity="error">{error?.data?.msg}</Alert>}
                {listCategories && productById && (
                  <ProductEdit listCategories={listCategories} productById={productById} />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default EditProduct;
