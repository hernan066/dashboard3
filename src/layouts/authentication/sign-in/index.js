/* eslint-disable no-unused-expressions */
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "api/authApi";
import { setCredentials } from "redux/authSlice";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  email: yup.string().email("Formato incorrecto").required("Requerido"),
  password: yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
});

function Basic() {
  const [errMsg, setErrMsg] = useState("");

  // const { startLogin, errorMessage, status } = useAuthStore();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const userData = await login({ email: values.email, password: values.password }).unwrap();
        dispatch(setCredentials({ ...userData, user: values.email }));
        navigate("/");
      } catch (err) {
        if (!err?.originalStatus) {
          // isLoading: true until timeout occurs
          setErrMsg("No Server Response");
        } else if (err.originalStatus === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.originalStatus === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
      }
    },
    validationSchema: schema,
  });

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {/* form */}
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!formik.errors.email}
              helperText={formik.errors.email}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!formik.errors.password}
              helperText={formik.errors.password}
              onChange={formik.handleChange}
            />

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                color: "#fff",
              }}
            >
              Ingresar
            </LoadingButton>
            {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
          </Box>
          {/* form */}
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;

/*  <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Recuerdame
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                Ingresar
              </MDButton>
            </MDBox> */
