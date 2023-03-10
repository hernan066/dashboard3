/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetProductQuery } from "api/productApi";
import ProductsLotsMove from "./ProductsLotsMove";

function MoveProductsLots() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const lotId = searchParams.get("lotId");

  const { data: product, isLoading: l1, isError: e1 } = useGetProductQuery(id);

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
                  Mover Stock
                </MDTypography>
              </MDBox>
              <MDBox>
                {l1 && <Loading />}
                {e1 && <Alert severity="error">Ha ocurrido un error</Alert>}
                {product && <ProductsLotsMove product={product} lotId={lotId} />}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default MoveProductsLots;
