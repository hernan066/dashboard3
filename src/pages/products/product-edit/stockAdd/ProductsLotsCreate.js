/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import Swal from "sweetalert2";
import { creteProductLotsSchema } from "validations/productsLots/creteProductsLotsYup";
import { usePutProductMutation } from "api/productApi";
import MDTypography from "components/MDTypography";
import { formatPrice } from "utils/formaPrice";

function ProductsLotsCreate({ ListSuppliers, productById }) {
  const navigate = useNavigate();

  const [editProduct, { isLoading, isError }] = usePutProductMutation();

  console.log(productById);

  const formik = useFormik({
    initialValues: {
      product: productById.name,
      supplier: "",
      quantity: undefined,
      unityCost: undefined,
      location: "",
    },
    onSubmit: async (values) => {
      const stock = [
        ...productById.stock,
        {
          productId: productById._id,
          name: productById.name,
          img: productById.img,
          supplier: values.supplier,
          quantity: values.quantity,
          cost: values.unityCost * values.quantity,
          unityCost: values.unityCost,
          stock: values.quantity,
          location: values.location,
          moveDate: null,
          createdStock: new Date(),
          updateStock: new Date(),
        },
      ];

      const id = productById._id;
      const res = await editProduct({ id, stock }).unwrap();
      console.log(res);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Stock de productos registrado con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
    },
    validationSchema: creteProductLotsSchema,
  });

  return (
    <MDBox pt={6} pb={3}>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
        }}
      >
        <Box sx={{ mt: 1, mx: 2, display: "flex", width: "100%", gap: 3 }}>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ width: "100%" }}
          >
            <TextField
              margin="normal"
              fullWidth
              required
              name="product"
              label="Nombre del producto"
              disabled="true"
              value={formik.values.product}
              error={!!formik.errors.product}
              helperText={formik.errors.product}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              select
              name="supplier"
              fullWidth
              label="Proveedor"
              value={formik.values.supplier}
              error={!!formik.errors.supplier}
              helperText={formik.errors.supplier}
              onChange={formik.handleChange}
            >
              {ListSuppliers.data.suppliers.map((supplier) => (
                <MenuItem key={supplier._id} value={supplier.businessName}>
                  {supplier.businessName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              select
              name="location"
              fullWidth
              label="Ubicación de stock"
              value={formik.values.location}
              error={!!formik.errors.location}
              helperText={formik.errors.location}
              onChange={formik.handleChange}
            >
              <MenuItem value="proveedor">En cámara del proveedor</MenuItem>
              <MenuItem value="local">En cámara del local</MenuItem>
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              required
              type="number"
              name="quantity"
              label="Cantidad"
              error={!!formik.errors.quantity}
              helperText={formik.errors.quantity}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              type="number"
              name="unityCost"
              label="Costo Unidad"
              error={!!formik.errors.unityCost}
              helperText={formik.errors.unityCost}
              onChange={formik.handleChange}
            />
            {formik.values.unityCost && formik.values.quantity && (
              <MDTypography variant="h6">
                Costo total: {formatPrice(+formik.values.unityCost * +formik.values.quantity)}
              </MDTypography>
            )}

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
            {isError && <Alert severity="error">Ha ocurrido un error, producto no creado</Alert>}
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default ProductsLotsCreate;
