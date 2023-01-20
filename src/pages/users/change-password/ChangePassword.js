/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */

import { LoadingButton } from "@mui/lab";
import { Alert, Box, Card, Grid, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import colors from "assets/theme/base/colors";
import MDButton from "components/MDButton";

import { usePutUserMutation } from "api/userApi";
import { changePasswordSchema } from "validations/users/changePasswordYup";

function ChangePassword() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editUserMutation, { isLoading, isError }] = usePutUserMutation();

  const formik = useFormik({
    initialValues: {
      password: "",
      password2: "",
    },
    onSubmit: async ({ password }) => {
      const editUserValues = {
        password,
      };

      const { data } = await editUserMutation({ id, ...editUserValues }).unwrap();
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contraseña cambiada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/usuarios/lista");
      }
    },
    validationSchema: changePasswordSchema,
    enableReinitialize: true,
  });

  return (
    <MDBox px={3} py={3}>
      <MDBox>
        <Grid sx={4}>
          <Card>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ p: 5, display: "flex", gap: 3, width: "100%" }}
            >
              <MDBox sx={{ width: "100%" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Nuevo password"
                  type="password"
                  error={!!formik.errors.password}
                  helperText={formik.errors.password}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="Reingrese nuevo password"
                  type="password"
                  error={!!formik.errors.password2}
                  helperText={formik.errors.password2}
                  onChange={formik.handleChange}
                />

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    mr: 2,
                    backgroundColor: `${colors.info.main}`,
                    color: "white !important",
                    "&:hover": { backgroundColor: colors.info.state },
                  }}
                >
                  Cambiar
                </LoadingButton>
                <MDButton
                  variant="outlined"
                  color="info"
                  onClick={() => navigate(-1)}
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                >
                  Cancelar
                </MDButton>
                {isError && (
                  <Alert severity="error">Ha ocurrido un error, contraseña no cambiada</Alert>
                )}
              </MDBox>
            </Box>
          </Card>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default ChangePassword;
