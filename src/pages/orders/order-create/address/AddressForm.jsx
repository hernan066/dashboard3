/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { usePostSuppliersMutation } from "api/supplierApi";
import { creteSupplierSchema } from "validations/suppliers/createSupplierYup";
import Swal from "sweetalert2";

function AddressForm() {
  const navigate = useNavigate();
  const [createSupplier, { isLoading, isError }] = usePostSuppliersMutation();

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
    },
    onSubmit: async (values) => {
      const res = await createSupplier(values).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Oferta creada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/suppliers");
      }
    },
    validationSchema: creteSupplierSchema,
  });

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", gap: 3 }}
    >
      <Box sx={{ width: "100%" }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Nombre/s"
          name="name"
          error={!!formik.errors.name}
          helperText={formik.errors.name}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="lastName"
          label="Apellido"
          error={!!formik.errors.lastName}
          helperText={formik.errors.lastName}
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
          fullWidth
          autoComplete="user_address"
          required
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
          autoComplete="off"
          name="flor"
          label="Piso (opcional)"
          id="user_flor"
          error={!!formik.errors.flor}
          helperText={formik.errors.flor}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          autoComplete="user_department"
          name="department"
          label="Departamento (opcional)"
          id="user_department"
          error={formik.errors.department}
          helperText={formik.errors.department}
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
          Confirmar
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
    </Box>
  );
}

export default AddressForm;
