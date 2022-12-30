/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import Swal from "sweetalert2";
import { usePostDeliveryTruckMutation } from "api/deliveryTruckApi";
import { createDeliveryTruckSchema } from "validations/deliveryTruck/createDeliveryTruckYup";

function DeliveryTruckCreate({ listUsers, ListDistributors, listDeliveryZones }) {
  const navigate = useNavigate();

  const [createDeliveryTruck, { isLoading, isError }] = usePostDeliveryTruckMutation();

  const deliveryFilterUsers = listUsers.filter((user) => user.role.role === "DELIVERY_ROLE");

  const formik = useFormik({
    initialValues: {
      user: "",
      distributor: "",
      truckId: "",
      defaultZone: "",
      patent: "",
      coldChamber: "",
      maximumLoad: undefined,
    },
    onSubmit: async (values) => {
      await createDeliveryTruck(values).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Repartidor creado con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/distribucion/repartidores/lista");
    },
    validationSchema: createDeliveryTruckSchema,
  });

  return (
    <MDBox pt={5} pb={3}>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
        }}
      >
        <Box sx={{ mx: 2, display: "flex", width: "100%", gap: 3 }}>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              select
              name="user"
              fullWidth
              label="Usuario"
              value={formik.values.user}
              error={!!formik.errors.user}
              helperText={formik.errors.user}
              onChange={formik.handleChange}
            >
              {deliveryFilterUsers.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.email}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              select
              name="distributor"
              fullWidth
              label="Distribuidora"
              value={formik.values.distributor}
              error={!!formik.errors.distributor}
              helperText={formik.errors.distributor}
              onChange={formik.handleChange}
            >
              {ListDistributors.map((distributor) => (
                <MenuItem key={distributor._id} value={distributor._id}>
                  {distributor.businessName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              fullWidth
              required
              name="truckId"
              label="ID (Distribuidora_Numero)"
              error={!!formik.errors.truckId}
              helperText={formik.errors.truckId}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="patent"
              label="Patente"
              error={!!formik.errors.patent}
              helperText={formik.errors.patent}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              select
              name="defaultZone"
              fullWidth
              label="Zona de reparto"
              value={formik.values.defaultZone}
              error={!!formik.errors.defaultZone}
              helperText={formik.errors.defaultZone}
              onChange={formik.handleChange}
            >
              {listDeliveryZones.map((zone) => (
                <MenuItem key={zone._id} value={zone._id}>
                  {zone.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              required
              type="number"
              name="maximumLoad"
              label="Carga maxima"
              error={!!formik.errors.maximumLoad}
              helperText={formik.errors.maximumLoad}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              select
              name="coldChamber"
              fullWidth
              label="Cámara de frio"
              value={formik.values.coldChamber}
              error={!!formik.errors.coldChamber}
              helperText={formik.errors.coldChamber}
              onChange={formik.handleChange}
            >
              <MenuItem value="true">Si</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </TextField>

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
            {isError && <Alert severity="error">Ha ocurrido un error, repartidor no creado</Alert>}
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default DeliveryTruckCreate;
