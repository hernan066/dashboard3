/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { useState } from "react";
import Swal from "sweetalert2";
import { usePostProductsLotMutation } from "api/productsLotsApi";
import { creteProductLotsSchema } from "validations/productsLots/creteProductsLotsYup";

function ProductsLotsCreate({ listProducts, ListSuppliers }) {
  const navigate = useNavigate();

  const [createProductsLots, { isLoading, isError }] = usePostProductsLotMutation();

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
  const [inputValue, setInputValue] = useState(autoCompleteProducts[0]);

  const formik = useFormik({
    initialValues: {
      product: "",
      supplier: "",
      quantity: undefined,
      cost: undefined,
    },
    onSubmit: async (values) => {
      const newProductLot = {
        ...values,
        product: inputValue.id,
        stock: values.quantity,
      };
      await createProductsLots(newProductLot).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Lote de productos con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/products_lots");
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
              id="controlled-demo"
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
              id="product_available_ofert"
              margin="normal"
              required
              select
              autoComplete="product_available_ofert"
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
              multiline
              maxRows={4}
              margin="normal"
              fullWidth
              required
              type="number"
              autoComplete="product_description"
              name="quantity"
              label="Cantidad"
              id="product_description"
              error={!!formik.errors.quantity}
              helperText={formik.errors.quantity}
              onChange={formik.handleChange}
            />
            <TextField
              multiline
              maxRows={4}
              margin="normal"
              fullWidth
              required
              type="number"
              autoComplete="product_description"
              name="cost"
              label="Costo"
              id="product_description"
              error={!!formik.errors.cost}
              helperText={formik.errors.cost}
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
            {isError && <Alert severity="error">Ha ocurrido un error, producto no creado</Alert>}
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default ProductsLotsCreate;
