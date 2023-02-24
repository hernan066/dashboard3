/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { createClientAddressSchema } from "validations/clientAddress/createClientAddressSchemaYup";
import Swal from "sweetalert2";
import { useState } from "react";
import { usePutClientAddressMutation } from "api/clientsAddressApi";

function ClientAddressEdit({ clients, zones, clientAddress }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [createClientAddress, { isLoading, isError }] = usePutClientAddressMutation();

  // const filterUser = users.filter((user) => user.role.role === "CLIENT_ROLE");

  const autoCompleteUsers = clients.map((client) => ({
    id: client._id,
    user: client.user._id,
    phone: client.user.phone,
    name: client.user.name,
    lastName: client.user.lastName,
  }));

  const [inputValue, setInputValue] = useState({
    id: clientAddress.client._id,
    user: clientAddress.user._id,
    phone: clientAddress.user.phone,
    name: clientAddress.user.name,
    lastName: clientAddress.user.lastName,
  });

  const formik = useFormik({
    initialValues: {
      user: "",
      address: clientAddress.address,
      department: clientAddress.department,
      flor: clientAddress.flor,
      province: clientAddress.province,
      city: clientAddress.city,
      zip: clientAddress.zip,
      deliveryZone: clientAddress.deliveryZone._id,
      type: clientAddress.type,
      phone: clientAddress.phone,
    },
    onSubmit: async (values) => {
      const editClientAddress = {
        ...values,
        user: inputValue.user,
        client: inputValue.id,
      };

      const res = await createClientAddress({ id, ...editClientAddress }).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cliente editado con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/clientes/direcciones/lista");
      }
    },
    validationSchema: createClientAddressSchema,
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
          sx={{ mt: 1, mx: 2, display: "flex", gap: 3, width: "100%" }}
        >
          <Box sx={{ width: "50%", marginTop: "13px" }}>
            <Autocomplete
              margin="normal"
              options={autoCompleteUsers}
              getOptionLabel={(options) => `${options.phone} - ${options.name} ${options.lastName}`}
              multiple={false}
              id="controlled-demo"
              value={inputValue}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event, newValue) => {
                setInputValue(newValue);
              }}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Cliente" variant="outlined" />}
            />
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
              name="department"
              label="Departamento (opcional)"
              value={formik.values.department}
              error={!!formik.errors.department}
              helperText={formik.errors.department}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="flor"
              label="Piso (opcional)"
              value={formik.values.flor}
              error={!!formik.errors.flor}
              helperText={formik.errors.flor}
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
            {isError && <Alert severity="error">Error — Cliente no creado</Alert>}
          </Box>

          <Box sx={{ width: "50%" }}>
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
              type="number"
              name="zip"
              label="Código postal"
              value={formik.values.zip}
              error={!!formik.errors.zip}
              helperText={formik.errors.zip}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              select
              name="deliveryZone"
              fullWidth
              label="Zona"
              value={formik.values.deliveryZone}
              error={!!formik.errors.deliveryZone}
              helperText={formik.errors.deliveryZone}
              onChange={formik.handleChange}
            >
              {zones.map((zone) => (
                <MenuItem key={zone._id} value={zone._id}>
                  {zone.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              margin="normal"
              required
              select
              name="type"
              fullWidth
              label="Tipo de dirección"
              value={formik.values.type}
              error={!!formik.errors.type}
              helperText={formik.errors.type}
              onChange={formik.handleChange}
            >
              <MenuItem value="negocio">Negocio</MenuItem>
              <MenuItem value="casa">Casa</MenuItem>
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              name="phone"
              label="Telefono del negocio (opcional)"
              value={formik.values.phone}
              error={!!formik.errors.phone}
              helperText={formik.errors.phone}
              onChange={formik.handleChange}
            />
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default ClientAddressEdit;
