/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { creteOrderAddressSchema } from "validations/oferts/createOrderAddressYup";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress, clearClient } from "redux/cartSlice";

function AddressForm({ setManualForm, setPage, zones, deliveryTrucks }) {
  const { client } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: client?.user.name || "",
      lastName: client?.user.lastName || "",
      phone: client?.user.phone || "",
      address: client?.address || "",
      flor: client?.flor || "",
      department: client?.department || "",
      province: client?.province || "",
      city: client?.city || "",
      zip: client?.zip || undefined,
      shippingCost: client.deliveryZone?.cost || undefined,
      deliveryZone: `${client.deliveryZone?._id}-${client.deliveryZone?.name}` || "",
      deliveryTruck: "",
    },
    onSubmit: async (values) => {
      dispatch(
        addShippingAddress({
          shippingAddress: values,
          shippingCost: values.shippingCost,
          deliveryZone: values.deliveryZone,
          deliveryTruck: values.deliveryTruck,
        })
      );
      if (setPage) {
        setPage(1);
      }
    },
    validationSchema: creteOrderAddressSchema,
  });

  const handlerCancel = () => {
    dispatch(clearClient());
    if (setManualForm) {
      setManualForm(false);
    }
  };

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
          value={formik.values.name}
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
          value={formik.values.lastName}
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
          value={formik.values.phone}
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
          value={formik.values.address}
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
          value={formik.values.flor}
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
          value={formik.values.department}
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
          value={formik.values.province}
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
          value={formik.values.city}
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
          value={formik.values.zip}
          error={!!formik.errors.zip}
          helperText={formik.errors.zip}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          required
          autoComplete="shippingCost"
          name="shippingCost"
          label="Costo de envío"
          id="shippingCost"
          type="number"
          value={formik.values.shippingCost}
          error={!!formik.errors.shippingCost}
          helperText={formik.errors.shippingCost}
          onChange={formik.handleChange}
        />
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
          {zones.map((zone) => (
            <MenuItem key={zone._id} value={`${zone._id}-${zone.name}`}>
              {zone.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          required
          select
          name="deliveryTruck"
          fullWidth
          label="Repartidor"
          value={formik.values.deliveryTruck}
          error={!!formik.errors.deliveryTruck}
          helperText={formik.errors.deliveryTruck}
          onChange={formik.handleChange}
        >
          {deliveryTrucks.map((delivery) => (
            <MenuItem key={delivery._id} value={`${delivery._id}-${delivery.truckId}`}>
              {delivery.truckId}
            </MenuItem>
          ))}
        </TextField>

        <LoadingButton
          type="submit"
          variant="contained"
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
          onClick={handlerCancel}
          sx={{
            mt: 3,
            mb: 2,
          }}
        >
          Cancelar
        </MDButton>
      </Box>
    </Box>
  );
}

export default AddressForm;
