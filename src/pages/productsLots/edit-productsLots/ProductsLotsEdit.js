/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { creteProductLotsSchema } from "validations/productsLots/creteProductsLotsYup";
import { usePutProductMutation } from "api/productApi";
import Swal from "sweetalert2";

function ProductsLotsEdit({ ListSuppliers, productLot: product, lotId }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editProductsLots, { isLoading, isError }] = usePutProductMutation();

  const [lotToEdit] = product.stock.filter((stock) => stock._id === lotId);
  const restOfLots = product.stock.filter((stock) => stock._id !== lotId);

  const formik = useFormik({
    initialValues: {
      product: lotToEdit.name,
      supplier: lotToEdit.supplier,
      quantity: lotToEdit.quantity,
      cost: lotToEdit.cost,
      stock: lotToEdit.stock,
      location: lotToEdit.location,
    },
    onSubmit: async (values) => {
      const stock = [
        ...restOfLots,
        {
          ...lotToEdit,
          supplier: values.supplier,
          quantity: values.quantity,
          cost: values.cost,
          stock: values.stock,
          location: values.location,
          updateStock: new Date(),
          unityCost: values.cost / values.quantity,
        },
      ];

      const res = await editProductsLots({ id, stock }).unwrap();
      console.log(res);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Stock de productos editado con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/productos/stock/lista");
    },
    validationSchema: creteProductLotsSchema,
  });

  const handleDelete = async () => {
    const stock = [...restOfLots];

    console.log(stock);

    Swal.fire({
      title: "Deseas borrar el stock de este producto?",
      text: "Este cambio no se puede revertir",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await editProductsLots({ id, stock }).unwrap();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Stock de productos borrado con éxito",
          showConfirmButton: false,
          timer: 2500,
        });

        navigate("/productos/stock/lista");
      }
    });
  };

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
              disabled="true"
              required
              name="product"
              label="Producto a editar"
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
              label="Cantidad comprada"
              value={formik.values.quantity}
              error={!!formik.errors.quantity}
              helperText={formik.errors.quantity}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              type="number"
              name="cost"
              label="Costo"
              value={formik.values.cost}
              error={!!formik.errors.cost}
              helperText={formik.errors.cost}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              type="number"
              name="stock"
              label="Stock actual"
              value={formik.values.stock}
              error={!!formik.errors.stock}
              helperText={formik.errors.stock}
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
            <LoadingButton
              variant="contained"
              loading={isLoading}
              onClick={handleDelete}
              sx={{
                mt: 3,
                mb: 2,
                mr: 2,
                backgroundColor: `${colors.error.main}`,
                color: "white !important",
              }}
            >
              Borrar
            </LoadingButton>
            <MDButton
              variant="outlined"
              color="info"
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

export default ProductsLotsEdit;
/* TODO ver editar */
