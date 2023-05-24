/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { createClientAddressSchema } from "validations/clientAddress/createClientAddressSchemaYup";
import Swal from "sweetalert2";
import { usePutClientAddressMutation } from "api/clientsAddressApi";
import { geoLocalization } from "api/geoApi";
import { useEffect, useState } from "react";
import Loading from "components/DRLoading";
import Leaflet from "./Leaflet";

function ClientAddressEdit({ client, zones, clientAddress }) {
  const navigate = useNavigate();

  const [createClientAddress, { isLoading, isError }] = usePutClientAddressMutation();
  const [coords, setCoord] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      user: "",
      address: clientAddress.address,
      department: clientAddress.department,
      flor: clientAddress.flor,
      province: clientAddress.province,
      city: clientAddress.city,
      zip: clientAddress.zip,
      deliveryZone: clientAddress.deliveryZone,
      type: clientAddress.type,
      phone: clientAddress.phone,
      lat: clientAddress?.lat || 0,
      lng: clientAddress?.lng || 0,
    },
    onSubmit: async (values) => {
      const editClientAddress = {
        ...values,
        user: client.user._id,
        client: client._id,
      };

      const res = await createClientAddress({
        id: clientAddress._id,
        ...editClientAddress,
      }).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cliente editado con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    validationSchema: createClientAddressSchema,
  });

  useEffect(() => {
    setLoading(true);
    const getGeo = async () => {
      const geo = await geoLocalization(clientAddress.address, clientAddress.city);
      setCoord(geo?.results[0]?.geometry.location);
    };
    getGeo();
    setLoading(false);
  }, []);

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
          sx={{ mt: 1, mx: 2, display: "flex", gap: 3, width: "100%" }}
        >
          <Box mt={3} sx={{ width: "50%" }}>
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
            <TextField
              margin="normal"
              fullWidth
              required
              type="number"
              name="lat"
              label="Latitud en base de datos"
              value={formik.values.lat}
              error={!!formik.errors.lat}
              helperText={formik.errors.lat}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              type="number"
              name="lng"
              label="Longitud en base de datos"
              value={formik.values.lng}
              error={!!formik.errors.lng}
              helperText={formik.errors.lng}
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
            {isError && <Alert severity="error">Error — Dirección no actualizada</Alert>}
          </Box>

          <Box mt={1.5} sx={{ width: "50%", height: 540 }}>
            {!coords ? <Loading /> : <Leaflet coords={coords} clientAddress={clientAddress} />}
          </Box>
          {/*  <Box sx={{ width: "50%" }}>{loading ? <Loading /> : <Map coords={coords} />}</Box> */}
        </Box>
      </Box>
    </MDBox>
  );
}

export default ClientAddressEdit;
