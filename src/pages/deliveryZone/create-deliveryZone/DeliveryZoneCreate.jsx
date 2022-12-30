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
import { createDeliveryZoneSchema } from "validations/deliveryZone/createDeliveryZoneYup";
import Swal from "sweetalert2";
import { usePostDeliveryZoneMutation } from "api/deliveryZoneApi";

function DeliveryZoneCreate() {
  const navigate = useNavigate();
  const [createDeliveryZone, { isLoading, isError }] = usePostDeliveryZoneMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      cost: undefined,
      province: "",
      city: "",
      zip: undefined,
      east: "",
      west: "",
      north: "",
      south: "",
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
      const res = await createDeliveryZone(newDeliveryZone).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Zona de reparto creada con éxito",
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
              autoFocus
              label="Nombre de zona"
              name="name"
              error={!!formik.errors.name}
              helperText={formik.errors.name}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              type="number"
              fullWidth
              autoFocus
              label="Costo"
              name="cost"
              error={!!formik.errors.cost}
              helperText={formik.errors.cost}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              label="Provincia"
              name="province"
              error={!!formik.errors.province}
              helperText={formik.errors.province}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              label="Ciudad"
              name="city"
              error={!!formik.errors.city}
              helperText={formik.errors.city}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              type="number"
              fullWidth
              autoFocus
              label="Código postal"
              name="zip"
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
              name="east"
              label="Limite este"
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

export default DeliveryZoneCreate;
