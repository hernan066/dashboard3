/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { useState } from "react";
import Swal from "sweetalert2";
import { usePutProductsLotMutation } from "api/productsLotsApi";
import { creteProductLotsSchema } from "validations/productsLots/creteProductsLotsYup";

function ProductsLotsEdit({ listProducts, ListSuppliers, productLot: productLotById }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editProductsLots, { isLoading, isError }] = usePutProductsLotMutation();

  const autoCompleteProducts = listProducts.products
    .map((product) => {
      const firstLetter = product.name[0].toUpperCase();
      return {
        id: product._id,
        unit: product.unit,
        product: product.name,
        img: product.img,
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      };
    })
    .sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter));

  const firstLetter = productLotById.data.productLot.product.name[0].toUpperCase();

  const [inputValue, setInputValue] = useState({
    id: productLotById.data.productLot.product._id,
    unit: productLotById.data.productLot.product.unit,
    product: productLotById.data.productLot.product.name,
    img: productLotById.data.productLot.product.img || "",
    firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  });

  const formik = useFormik({
    initialValues: {
      product: productLotById.data.productLot.product.name,
      supplier: productLotById.data.productLot.supplier,
      quantity: productLotById.data.productLot.quantity,
      cost: productLotById.data.productLot.cost,
      stock: productLotById.data.productLot.stock,
    },
    onSubmit: async (values) => {
      const newProductLot = {
        ...values,
        product: inputValue.id,
      };
      await editProductsLots({ id, ...newProductLot }).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Lote de productos editado con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/productos/stock/lista");
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
            <Autocomplete
              options={autoCompleteProducts}
              getOptionLabel={(options) => options.product}
              groupBy={(option) => option.firstLetter}
              multiple={false}
              value={inputValue}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event, newValue) => {
                setInputValue(newValue);
              }}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Productos" variant="outlined" />
              )}
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
                <MenuItem key={supplier._id} value={supplier._id}>
                  {supplier.businessName}
                </MenuItem>
              ))}
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

export default ProductsLotsEdit;
