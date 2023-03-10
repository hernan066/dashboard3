/* eslint-disable prettier/prettier */
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
import * as yup from "yup";
import { usePutProductMutation } from "api/productApi";
import MDTypography from "components/MDTypography";

function ProductsLotsMove({ product, lotId }) {
  const navigate = useNavigate();

  const [moveProductsLots, { isLoading, isError }] = usePutProductMutation();

  const [lotToEdit] = product.stock.filter((stock) => stock._id === lotId);
  const restOfLots = product.stock.filter((stock) => stock._id !== lotId);

  const formik = useFormik({
    initialValues: {
      product: lotToEdit.name,
      quantity: undefined,
      location: "",
    },
    onSubmit: async (values) => {
      console.log(lotToEdit);
      const newProductLot = [
        {
          productId: lotToEdit.productId,
          name: lotToEdit.name,
          img: lotToEdit.img,
          supplier: lotToEdit.supplier,
          quantity: values.quantity,
          cost: lotToEdit.unityCost * values.quantity,
          unityCost: lotToEdit.cost / values.quantity,
          stock: values.quantity,
          location: values.location,
          moveDate: new Date(),
          createdStock: new Date(),
          updateStock: new Date(),
        },
      ];
      const editProductLot = [
        {
          ...lotToEdit,
          stock: lotToEdit.stock - values.quantity,
          cost: lotToEdit.cost - lotToEdit.unityCost * values.quantity,
          quantity: lotToEdit.quantity - values.quantity,
        },
      ];

      const stock = [...restOfLots, ...newProductLot, ...editProductLot];
      const id = product._id;

      const res = await moveProductsLots({ id, stock }).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Stock de productos movidos con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/productos/stock/lista");
      }
    },
    validationSchema: yup.object().shape({
      location: yup.string().required("Requerido"),
      quantity: yup
        .number()
        .required("Requerido")
        .positive("El valor no puede ser negativo")
        .min(1, "El número no puede se 0")
        .max(
          lotToEdit?.stock ? lotToEdit.stock : 100,
          "El número no puede se mayor al stock existente"
        ),
    }),
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
            <MDTypography variant="h6">
              {lotToEdit.name} || Stock: {lotToEdit.stock}
            </MDTypography>

            <TextField
              margin="normal"
              required
              select
              name="location"
              fullWidth
              label="Nueva ubicación"
              value={formik.values.location}
              error={!!formik.errors.location}
              helperText={formik.errors.location}
              onChange={formik.handleChange}
            >
              {/*  <MenuItem value="proveedor">En cámara del proveedor</MenuItem> */}
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
              Mover
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

export default ProductsLotsMove;
