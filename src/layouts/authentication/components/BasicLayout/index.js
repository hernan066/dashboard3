import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/authentication/components/Footer";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";

// eslint-disable-next-line no-unused-vars
function BasicLayout({ children }) {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <PageLayout>
      <MDBox width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          {matches && (
            <Grid item xs={0} sm={0} md={5} lg={4} xl={8}>
              <Box
                sx={{
                  backgroundColor: "#ee1702",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://ik.imagekit.io/mrprwema7/logo%20(2)_NDTbDz_bz.png?updatedAt=1690996182599"
                  alt="logo"
                />
              </Box>
            </Grid>
          )}

          <Grid
            item
            xs={12}
            sm={9}
            md={5}
            lg={4}
            xl={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: `${matches ? "#f1f1f1" : "#ee1702"}`,
            }}
          >
            <Box
              sx={{
                width: `${matches ? "400px" : "100%"}`,
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {children}
            </Box>
          </Grid>
        </Grid>
      </MDBox>
      <Footer light />
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
