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
import { createDeliveryZoneSchema } from "validations/deliveryZone/createDeliveryZoneYup";
import Swal from "sweetalert2";
import { usePutDeliveryZoneMutation } from "api/deliveryZoneApi";

function DeliveryZoneEdit({ deliveryZone }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editDeliveryZone, { isLoading, isError }] = usePutDeliveryZoneMutation();

  const formik = useFormik({
    initialValues: {
      name: deliveryZone.name,
      cost: deliveryZone.cost,
      province: deliveryZone.province,
      city: deliveryZone.city,
      zip: deliveryZone.zip,
      east: deliveryZone.limits[0]?.east,
      west: deliveryZone.limits[0]?.west,
      north: deliveryZone.limits[0]?.north,
      south: deliveryZone.limits[0]?.south,
    },
    onSubmit: async ({ name, cost, province, city, zip, north, south, east, west }) => {
      const newDeliveryZone = {
        name,
        cost,
        province,
        city,
        zip,
        limits: [
          {
            north,
            south,
            east,
            west,
          },
        ],
      };
      const res = await editDeliveryZone({ id, ...newDeliveryZone }).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Zona de reparto editada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/distribucion/zonas/lista");
      }
    },
    validationSchema: createDeliveryZoneSchema,
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
              label="Nombre de zona"
              name="name"
              value={formik.values.name}
              error={!!formik.errors.name}
              helperText={formik.errors.name}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              type="number"
              fullWidth
              label="Costo"
              name="cost"
              value={formik.values.cost}
              error={!!formik.errors.cost}
              helperText={formik.errors.cost}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Provincia"
              name="province"
              value={formik.values.province}
              error={!!formik.errors.province}
              helperText={formik.errors.province}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Ciudad"
              name="city"
              value={formik.values.city}
              error={!!formik.errors.city}
              helperText={formik.errors.city}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              type="number"
              fullWidth
              label="Código postal"
              name="zip"
              value={formik.values.zip}
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
            {isError && <Alert severity="error">Error — Proveedor no creado</Alert>}
          </Box>

          <Box sx={{ width: "50%" }}>
            <TextField
              margin="normal"
              fullWidth
              required
              name="east"
              label="Limite este"
              value={formik.values.east}
              error={!!formik.errors.east}
              helperText={formik.errors.east}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              name="west"
              label="Limite oeste"
              value={formik.values.west}
              error={!!formik.errors.west}
              helperText={formik.errors.west}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="north"
              label="Limite norte"
              value={formik.values.north}
              error={!!formik.errors.north}
              helperText={formik.errors.north}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="south"
              label="Limite sur"
              value={formik.values.south}
              error={!!formik.errors.south}
              helperText={formik.errors.south}
              onChange={formik.handleChange}
            />
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default DeliveryZoneEdit;
