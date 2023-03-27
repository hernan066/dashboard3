/* eslint-disable no-unused-vars */
import { Alert, Grid } from "@mui/material";
import { useGetClientsQuery } from "api/clientsApi";
import { useGetOfertsQuery } from "api/ofertApi";
import Loading from "components/DRLoading";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "redux/cartSlice";
import CreateOrder from "./CreateOrder";

function OrderLocalCreate() {
  const dispatch = useDispatch();
  const { data: oferts, isLoading: l1, isError: e1 } = useGetOfertsQuery();
  const { data: clients, isLoading: l2, isError: e2 } = useGetClientsQuery();

  useEffect(() => {
    dispatch(clearCart());
  }, []);

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
                Compra con entrega en local
              </MDTypography>
            </MDBox>
            <MDBox pt={3} px={2}>
              {(l1 || l2) && <Loading />}
              {(e1 || e2) && <Alert severity="error">Ha ocurrido un error</Alert>}
              {oferts && clients && <CreateOrder oferts={oferts} clients={clients.data.clients} />}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default OrderLocalCreate;
