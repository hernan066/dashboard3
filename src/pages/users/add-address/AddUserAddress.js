/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import Swal from "sweetalert2";
import { creteDistributorsSchema } from "validations/distributors/createDistrubutorsYup";
import { usePutUserMutation } from "api/userApi";

function AddAddress() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateAddress, { isLoading, isError }] = usePutUserMutation();

  const formik = useFormik({
    initialValues: {
      address: "",
      province: "",
      city: "",
      zip: undefined,
    },
    onSubmit: async (values) => {
      const res = await updateAddress({ id, ...values }).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Distribuidora creada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/users");
      }
    },
    validationSchema: creteDistributorsSchema,
  });

  return (
    <MDBox pt={3} pb={3}>
      <Box
        sx={{
          display: "flex",
          gap: 5,
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mx: 2, display: "flex", gap: 3, width: "100%" }}
        >
          <Box sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              fullWidth
              required
              autoComplete="user_address"
              name="address"
              label="Dirección"
              id="user_address"
              error={!!formik.errors.address}
              helperText={formik.errors.address}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              autoComplete="user_province"
              name="province"
              label="Provincia"
              id="user_province"
              error={!!formik.errors.province}
              helperText={formik.errors.province}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              autoComplete="user_city"
              name="city"
              label="Ciudad"
              id="user_city"
              error={!!formik.errors.city}
              helperText={formik.errors.city}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              autoComplete="user_zip"
              name="zip"
              label="Código Postal"
              id="user_zip"
              type="number"
              error={!!formik.errors.zip}
              helperText={formik.errors.zip}
              onChange={formik.handleChange}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
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
                  }}
                >
                  Actualizar dirección
                </LoadingButton>

                <MDButton
                  variant="outlined"
                  color="info"
                  onClick={() => navigate(-1)}
                  sx={{
                    mt: 3,
                    mb: 2,
                    ml: 2,
                  }}
                >
                  Cancelar
                </MDButton>
              </Box>
              <MDButton
                variant="outlined"
                color="error"
                onClick={() => navigate(-1)}
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                Borrar dirección
              </MDButton>
            </Box>
            {isError && <Alert severity="error">Error — Proveedor no creado</Alert>}
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default AddAddress;
