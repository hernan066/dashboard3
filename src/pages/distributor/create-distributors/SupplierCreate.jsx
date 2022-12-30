/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import Swal from "sweetalert2";
import { usePostDistributorMutation } from "api/distributorApi";
import { creteDistributorsSchema } from "validations/distributors/createDistrubutorsYup";

function DistributorCreate() {
  const navigate = useNavigate();
  const [createDistributor, { isLoading, isError }] = usePostDistributorMutation();

  const formik = useFormik({
    initialValues: {
      businessName: "",
      cuit: "",
      email: "",
      phone: "",
      address: "",
      province: "",
      city: "",
      zip: undefined,
      maximum: undefined,
    },
    onSubmit: async (values) => {
      const res = await createDistributor(values).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Distribuidora creada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/distribucion/distribuidoras/lista");
      }
    },
    validationSchema: creteDistributorsSchema,
  });

  return (
    <MDBox pt={6} pb={3}>
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
          sx={{ mt: 1, mx: 2, display: "flex", gap: 3 }}
        >
          <Box sx={{ width: "50%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Razón social"
              name="businessName"
              error={!!formik.errors.businessName}
              helperText={formik.errors.businessName}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Cuit"
              name="cuit"
              error={!!formik.errors.cuit}
              helperText={formik.errors.cuit}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              error={!!formik.errors.email}
              helperText={formik.errors.email}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Telefono"
              error={!!formik.errors.phone}
              helperText={formik.errors.phone}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              type="number"
              required
              fullWidth
              name="maximum"
              label="Máximo"
              error={!!formik.errors.maximum}
              helperText={formik.errors.maximum}
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
              }}
            >
              Crear
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
            {isError && <Alert severity="error">Error — Proveedor no creado</Alert>}
          </Box>

          <Box sx={{ width: "50%" }}>
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
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default DistributorCreate;
