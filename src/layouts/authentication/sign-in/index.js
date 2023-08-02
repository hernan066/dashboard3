/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import MDBox from "components/MDBox";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Alert, Box, TextField, Typography, useMediaQuery } from "@mui/material";
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
  const matches = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const userData = await login({ email: values.email, password: values.password }).unwrap();
        dispatch(setCredentials({ ...userData }));
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: schema,
  });

  return (
    <BasicLayout image={bgImage}>
      <Box
        sx={{
          border: "1px solid #666",
          borderRadius: "10px",
          backgroundColor: "#f1f1f1",
          width: `${matches ? "100%" : "95%"}`,
        }}
      >
        <Typography
          sx={{ textAlign: "center", marginTop: "40px", letterSpacing: "4px", fontSize: "22px" }}
        >
          INGRESAR
        </Typography>

        <MDBox pt={4} pb={3} px={3}>
          {/* form */}
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <img
                src="https://ik.imagekit.io/mrprwema7/user_OkKLt0tst.png?updatedAt=1688138561573"
                alt="icono usuario"
                style={{ width: "30px", height: "30px" }}
              />

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
            </Box>
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <img
                src="https://ik.imagekit.io/mrprwema7/password_sMXDhy2rr.png?updatedAt=1688138561435"
                alt="icono password"
                style={{ width: "30px", height: "30px" }}
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
            </Box>

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
              Enviar
            </LoadingButton>
            {isError && (
              <Alert severity="warning">{error.data?.msg || "Ha ocurrido un error"}</Alert>
            )}
          </Box>
          {/* form */}
        </MDBox>
      </Box>
    </BasicLayout>
  );
}

export default Basic;
