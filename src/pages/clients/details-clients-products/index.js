/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import { useGetClientTypesQuery } from "api/clientsTypeApi";
import { useGetClientCategoriesQuery } from "api/clientsCategoryApi";
import { useGetUsersQuery } from "api/userApi";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetClientQuery } from "api/clientsApi";
import { useGetProductQuery, useGetProductOfertQuery } from "api/productApi";

import {
  useGetTotalIndividualProductQuery,
  useGetTotalIndividualProductLast30DaysQuery,
} from "api/reportApi";
import DataProduct from "./DataProduct";

function DetailClientProduct() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("cliente");

  const { data: dataClient, isLoading: l1, error: e1 } = useGetClientQuery(clientId);
  const { data: productById, isLoading: l2, error: e2 } = useGetProductQuery(id);
  const { data: ofertById, isLoading: l4, error: e4 } = useGetProductOfertQuery(id);

  const {
    data: totalProductSell,
    isLoading: l5,
    error: e5,
  } = useGetTotalIndividualProductQuery({ id, client: clientId });
  const {
    data: totalProductSellLast30Days,
    isLoading: l6,
    error: e6,
  } = useGetTotalIndividualProductLast30DaysQuery({ id, client: clientId });

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
                  Detalle del productos comprados
                </MDTypography>
              </MDBox>
              <MDBox>
                {(l1 || l2 || l4 || l5 || l6) && <Loading />}
                {(e1 || e2 || e4 || e5 || e6) && (
                  <Alert severity="error">Ha ocurrido un error</Alert>
                )}
                {productById &&
                  ofertById &&
                  totalProductSell &&
                  totalProductSellLast30Days &&
                  dataClient && (
                    <DataProduct
                      dataClient={dataClient.data.client}
                      productById={productById}
                      ofertById={ofertById.data.ofert}
                      totalProductSell={totalProductSell.data.report}
                      totalProductSellLast30Days={totalProductSellLast30Days.data.report}
                      totalProductSellByMonth={totalProductSell.data.byMonth}
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

export default DetailClientProduct;
