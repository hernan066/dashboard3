/* eslint-disable react/prop-types */
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
import { usePutDistributorMutation } from "api/distributorApi";

function DistributorEdit({ distributor }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editDistributor, { isLoading, isError }] = usePutDistributorMutation();

  const formik = useFormik({
    initialValues: {
      businessName: distributor.businessName,
      cuit: distributor.cuit,
      email: distributor.email,
      phone: distributor.phone,
      address: distributor.address,
      province: distributor.province,
      city: distributor.city,
      zip: distributor.zip,
      maximum: distributor.maximum,
    },
    onSubmit: async (values) => {
      const res = await editDistributor({ id, ...values }).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Distribuidora editada con éxito",
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
              value={formik.values.businessName}
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
              value={formik.values.cuit}
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
              value={formik.values.email}
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
              value={formik.values.phone}
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
              value={formik.values.maximum}
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
              Editar
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
            {isError && <Alert severity="error">Error — Distribuidora no creada</Alert>}
          </Box>

          <Box sx={{ width: "50%" }}>
            <TextField
              margin="normal"
              fullWidth
              required
              name="address"
              label="Dirección"
              value={formik.values.address}
              error={!!formik.errors.address}
              helperText={formik.errors.address}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              name="province"
              label="Provincia"
              value={formik.values.province}
              error={!!formik.errors.province}
              helperText={formik.errors.province}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="city"
              label="Ciudad"
              value={formik.values.city}
              error={!!formik.errors.city}
              helperText={formik.errors.city}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="zip"
              label="Código Postal"
              type="number"
              value={formik.values.zip}
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

export default DistributorEdit;
