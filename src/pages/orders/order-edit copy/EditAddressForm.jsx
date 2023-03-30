/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Divider, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { editOrderAddressSchema } from "validations/orders/editOrderAddressYup";
import MDTypography from "components/MDTypography";
import { usePutOrderMutation, useDeleteOrderMutation } from "api/orderApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { formatQuantity } from "utils/quantityFormat";
import { usePutProductStockMutation } from "api/productApi";

function EditAddressForm({ zones, deliveryTrucks, order }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const orderStore = useSelector((store) => store.order.order);

  const [editOrder, { isLoading: l1, isError: e1 }] = usePutOrderMutation();
  const [deleteOrder, { isLoading: l2, isError: e2 }] = useDeleteOrderMutation();
  const [editProductStock, { isLoading: l3, isError: e3 }] = usePutProductStockMutation();
  console.log(order);

  const formik = useFormik({
    initialValues: {
      name: order.shippingAddress.name || "",
      lastName: order.shippingAddress.lastName || "",
      phone: order.shippingAddress.phone || "",
      address: order.shippingAddress.address || "",
      flor: order.shippingAddress.flor || "",
      department: order.shippingAddress.department || "",
      province: order.shippingAddress.province || "",
      city: order.shippingAddress.city || "",
      zip: order.shippingAddress.zip || null,
      tax: order.tax || null,
      deliveryZone: order.deliveryZone?._id,
      deliveryTruck: order.deliveryTruck?._id,
      status: order.status,
      active: order.active,
      cash: order?.payment?.cash || 0,
      transfer: order?.payment?.transfer || 0,
      debt: order?.payment?.debt || 0,
      paid: order?.paid || false,
    },
    onSubmit: async (values) => {
      const editOrderValues = {
        ...values,
        orderItems: orderStore?.orderItems,
        tax: values.tax,
        subTotal: orderStore?.subTotal,
        total: orderStore?.total,
        shippingAddress: {
          name: values.name,
          lastName: values.lastName,
          phone: values.phone,
          address: values.address,
          flor: values.flor,
          department: values.department,
          province: values.province,
          city: values.city,
          zip: values.zip,
        },
        payment: {
          cash: values.cash,
          transfer: values.transfer,
          debt: values.debt,
        },
      };
      await editOrder({ id, ...editOrderValues }).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Orden editado con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/ordenes/lista");
    },
    validationSchema: editOrderAddressSchema,
  });

  const handlerDelete = () => {
    const updateProducts = order.orderItems.map((product) => ({
      productId: product.productId,
      totalQuantity: -product.totalQuantity, // negativo porque es una devolución de stock
      stockId: product.stockId,
    }));

    Swal.fire({
      title: "Deseas borrar esta orden?",
      text: "Al borrar esta orden el stock volverá como devolución.",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        updateProducts.map(async (product) => {
          const updateData = {
            stockId: product.stockId,
            totalQuantity: formatQuantity(product.totalQuantity),
          };
          const id = product.productId;
          await editProductStock({ id, ...updateData }).unwrap();
        });

        await deleteOrder(id).unwrap();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Orden borrada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/ordenes/lista");
      }
    });
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

        <Divider />
        <MDTypography variant="h6">Zona de reparto</MDTypography>
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
            <MenuItem key={zone._id} value={zone._id}>
              {zone.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          fullWidth
          required
          name="tax"
          label="Costo de envío"
          type="number"
          value={formik.values.tax}
          error={!!formik.errors.tax}
          helperText={formik.errors.tax}
          onChange={formik.handleChange}
        />
        <Divider />
        <MDTypography variant="h6">Repartidor</MDTypography>
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
            <MenuItem key={delivery._id} value={delivery._id}>
              {delivery.truckId}
            </MenuItem>
          ))}
        </TextField>
        <Divider />
        <MDTypography variant="h6">Estado de la orden</MDTypography>
        <TextField
          margin="normal"
          required
          select
          name="status"
          fullWidth
          label="Estado"
          value={formik.values.status}
          error={!!formik.errors.status}
          helperText={formik.errors.status}
          onChange={formik.handleChange}
        >
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Entregado">Entregado</MenuItem>
          <MenuItem value="Rechazado">Rechazado</MenuItem>
        </TextField>
        <TextField
          margin="normal"
          required
          select
          name="active"
          fullWidth
          label="Activa (se envía al repartidor)"
          value={formik.values.active}
          error={!!formik.errors.active}
          helperText={formik.errors.active}
          onChange={formik.handleChange}
        >
          <MenuItem value={true}>Si</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>

        <Divider />
        <MDTypography variant="h6">Pago</MDTypography>
        <TextField
          margin="normal"
          fullWidth
          required
          name="cash"
          label="Efectivo"
          type="number"
          value={formik.values.cash}
          error={!!formik.errors.cash}
          helperText={formik.errors.cash}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          required
          name="transfer"
          label="Transferencia"
          type="number"
          value={formik.values.transfer}
          error={!!formik.errors.transfer}
          helperText={formik.errors.transfer}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          required
          name="debt"
          label="Debe"
          type="number"
          value={formik.values.debt}
          error={!!formik.errors.debt}
          helperText={formik.errors.debt}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          required
          select
          name="paid"
          fullWidth
          label="Pagada"
          value={formik.values.paid}
          error={!!formik.errors.paid}
          helperText={formik.errors.paid}
          onChange={formik.handleChange}
        >
          <MenuItem value={true}>Si</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={l1}
          sx={{
            mt: 3,
            mb: 2,
            mr: 2,
            width: "100%",
            backgroundColor: `${colors.info.main}`,
            color: "white !important",
          }}
        >
          Editar Orden
        </LoadingButton>
        <LoadingButton
          variant="contained"
          loading={l2 || l3}
          onClick={handlerDelete}
          sx={{
            mt: 0.5,
            mb: 2,
            mr: 2,
            width: "100%",
            backgroundColor: `${colors.error.main}`,
            color: "white !important",
            "&:hover": {
              backgroundColor: `${colors.error.main}`,
            },
          }}
        >
          Borrar Orden
        </LoadingButton>

        <MDButton
          variant="outlined"
          color="info"
          onClick={() => navigate(-1)}
          sx={{
            mt: 0.5,
            mb: 2,
            width: "100%",
          }}
        >
          Cancelar
        </MDButton>

        {e1 && <Alert severity="error">Ha ocurrido un error, orden no editada</Alert>}
        {(e2 || e3) && <Alert severity="error">Ha ocurrido un error, orden no borrada</Alert>}
      </Box>
    </Box>
  );
}

export default EditAddressForm;
