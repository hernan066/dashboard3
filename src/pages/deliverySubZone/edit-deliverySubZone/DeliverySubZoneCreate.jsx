/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";

import Swal from "sweetalert2";
import { usePutDeliverySubZoneMutation } from "api/deliverySubZoneApi";
import { createDeliverySubZoneSchema } from "validations/deliverySubZone/createDeliverySubZoneYup";

function DeliverySubZoneEdit({ deliveryZones, deliverySubZone }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [createDeliveryZone, { isLoading, isError }] = usePutDeliverySubZoneMutation();

  const formik = useFormik({
    initialValues: {
      deliveryZone: deliverySubZone.deliveryZone._id,
      name: deliverySubZone.name,
      km2: deliverySubZone.km2,
      blocks: deliverySubZone.blocks,
      busStop: deliverySubZone.busStop,
      totalHouses: deliverySubZone.totalHouses,
      clientHouses: deliverySubZone.clientHouses,
      totalShops: deliverySubZone.totalShops,
      clientShops: deliverySubZone.clientShops,
      east: deliverySubZone.limits[0].east,
      west: deliverySubZone.limits[0].west,
      north: deliverySubZone.limits[0].north,
      south: deliverySubZone.limits[0].south,
    },
    onSubmit: async ({
      deliveryZone,
      name,
      km2,
      blocks,
      busStop,
      totalHouses,
      clientHouses,
      totalShops,
      clientShops,
      north,
      south,
      east,
      west,
    }) => {
      const editDeliveryZone = {
        deliveryZone,
        name,
        km2,
        blocks,
        busStop,
        totalHouses,
        clientHouses,
        totalShops,
        clientShops,
        limits: [
          {
            north,
            south,
            east,
            west,
          },
        ],
      };
      const res = await createDeliveryZone({ id, ...editDeliveryZone }).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "SubZona de reparto editada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/distribucion/sub-zonas/lista");
      }
    },
    validationSchema: createDeliverySubZoneSchema,
  });

  return (
    <MDBox pt={1} pb={3}>
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
              select
              name="deliveryZone"
              fullWidth
              label="Zona de reparto"
              value={formik.values.deliveryZone}
              error={!!formik.errors.deliveryZone}
              helperText={formik.errors.deliveryZone}
              onChange={formik.handleChange}
            >
              {deliveryZones.map((zone) => (
                <MenuItem key={zone._id} value={zone._id}>
                  {zone.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nombre de subZona"
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
              label="Km2"
              name="km2"
              value={formik.values.km2}
              error={!!formik.errors.km2}
              helperText={formik.errors.km2}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              label="Manzanas"
              name="blocks"
              value={formik.values.blocks}
              error={!!formik.errors.blocks}
              helperText={formik.errors.blocks}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              label="Paradas de colectivos"
              name="busStop"
              value={formik.values.busStop}
              error={!!formik.errors.busStop}
              helperText={formik.errors.busStop}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              type="number"
              fullWidth
              label="Total de casas"
              name="totalHouses"
              value={formik.values.totalHouses}
              error={!!formik.errors.totalHouses}
              helperText={formik.errors.totalHouses}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              type="number"
              fullWidth
              label="Total de casas clientes"
              name="clientHouses"
              value={formik.values.clientHouses}
              error={!!formik.errors.clientHouses}
              helperText={formik.errors.clientHouses}
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
              required
              type="number"
              fullWidth
              label="Total de negocios"
              name="totalShops"
              value={formik.values.totalShops}
              error={!!formik.errors.totalShops}
              helperText={formik.errors.totalShops}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              type="number"
              fullWidth
              label="Total de negocios clientes"
              name="clientShops"
              value={formik.values.clientShops}
              error={!!formik.errors.clientShops}
              helperText={formik.errors.clientShops}
              onChange={formik.handleChange}
            />

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

export default DeliverySubZoneEdit;
