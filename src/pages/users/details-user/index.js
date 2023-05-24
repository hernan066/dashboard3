/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

import profilesListData from "layouts/profile/data/profilesListData";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "api/userApi";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import Header from "./components/Header";

function ProfileUser() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetUserQuery(id);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      {isLoading && <Loading key="loading-profile" />}
      {error && <Alert severity="error">`Ha ocurrido un error: ${error?.data?.msg}`</Alert>}
      {data && (
        <Header data={data}>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={4}>
                <ProfileInfoCard
                  title="Información Personal"
                  info={{
                    Nombre: data.data.user.name,
                    Apellido: data.data.user.lastName,
                    Teléfono: data.data.user.phone,
                    Email: data.data.user.email,
                  }}
                  social={[
                    {
                      link: "https://www.facebook.com/CreativeTim/",
                      icon: <FacebookIcon />,
                      color: "facebook",
                    },
                    {
                      link: "https://twitter.com/creativetim",
                      icon: <TwitterIcon />,
                      color: "twitter",
                    },
                    {
                      link: "https://www.instagram.com/creativetimofficial/",
                      icon: <InstagramIcon />,
                      color: "instagram",
                    },
                  ]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="Dirección"
                  info={{
                    Dirección: data.data.user.userAddresses[0]?.address,
                    Piso: data.data.user.userAddresses[0]?.flor,
                    Departamento: data.data.user.userAddresses[0]?.departament,
                    Provincia: data.data.user.userAddresses[0]?.province,
                    Ciudad: data.data.user.userAddresses[0]?.city,
                    CP: data.data.user.userAddresses[0]?.zip,
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
                <Divider orientation="vertical" sx={{ mx: 0 }} />
              </Grid>
              <Grid item xs={12} xl={4}>
                <ProfilesList title="Ultimos mensajes" profiles={profilesListData} shadow={false} />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDTypography variant="h6" fontWeight="medium">
              Ordenes
            </MDTypography>
            <MDBox mb={1}>
              <MDTypography variant="button" color="text">
                Aca va una tabla con las ultimas ordenes
              </MDTypography>
            </MDBox>
          </MDBox>
        </Header>
      )}

      {/*  <Footer /> */}
    </DashboardLayout>
  );
}

export default ProfileUser;
