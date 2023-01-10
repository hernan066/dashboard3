/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { useState } from "react";
import MDTypography from "components/MDTypography";
import Swal from "sweetalert2";
import { creteOfertSchema } from "validations/oferts/creteOfertYup";
import { usePostOfertMutation } from "api/ofertApi";
import "./productCard.css";

function OfertCreate({ listProducts }) {
  const navigate = useNavigate();

  const [createOfert, { isLoading, isError }] = usePostOfertMutation();

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
      description: "",
      price1: undefined,
      price2: undefined,
      price3: undefined,
      quantity1: undefined,
      quantity2: undefined,
      quantity3: undefined,
      visible: undefined,
      ofert: undefined,
    },
    onSubmit: async (values) => {
      const newOfert = {
        product: inputValue.id,
        description: values.description,
        visible: values.visible,
        ofert: values.ofert,
        prices: [{ price1: values.price1, price2: values.price2, price3: values.price3 }],
        quantities: [
          {
            quantity1: values.quantity1,
            quantity2: values.quantity2,
            quantity3: values.quantity3,
          },
        ],
      };
      await createOfert(newOfert).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Oferta creada con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/productos/ofertas/lista");
    },
    validationSchema: creteOfertSchema,
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
              multiline
              maxRows={4}
              margin="normal"
              fullWidth
              required
              autoComplete="product_description"
              name="description"
              label="Descripción"
              id="product_description"
              error={!!formik.errors.description}
              helperText={formik.errors.description}
              onChange={formik.handleChange}
            />
            <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              <TextField
                margin="normal"
                required
                autoComplete="price1_ofert"
                fullWidth
                id="price1_ofert"
                label="Precio 1"
                name="price1"
                type="number"
                value={formik.values.price1}
                error={!!formik.errors.price1}
                helperText={formik.errors.price1}
                onChange={formik.handleChange}
              />
              <TextField
                margin="normal"
                required
                autoComplete="quantity1_ofert"
                fullWidth
                id="quantity1_ofert"
                label="Cantidad 1"
                name="quantity1"
                type="number"
                value={formik.values.quantity1}
                error={!!formik.errors.quantity1}
                helperText={formik.errors.quantity1}
                onChange={formik.handleChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              <TextField
                margin="normal"
                required
                autoComplete="price2_ofert"
                fullWidth
                id="price2_ofert"
                label="Precio 2"
                name="price2"
                type="number"
                value={formik.values.price2}
                error={!!formik.errors.price2}
                helperText={formik.errors.price2}
                onChange={formik.handleChange}
              />
              <TextField
                margin="normal"
                required
                autoComplete="quantity2_ofert"
                fullWidth
                id="quantity2_ofert"
                label="Cantidad 2"
                name="quantity2"
                type="number"
                value={formik.values.quantity2}
                error={!!formik.errors.quantity2}
                helperText={formik.errors.quantity2}
                onChange={formik.handleChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              <TextField
                margin="normal"
                required
                autoComplete="price3_ofert"
                fullWidth
                id="price3_ofert"
                label="Precio 3"
                name="price3"
                type="number"
                value={formik.values.price3}
                error={!!formik.errors.price3}
                helperText={formik.errors.price3}
                onChange={formik.handleChange}
              />
              <TextField
                margin="normal"
                required
                autoComplete="quantity3_ofert"
                fullWidth
                id="quantity3_ofert"
                label="Cantidad 3"
                name="quantity3"
                type="number"
                value={formik.values.quantity3}
                error={!!formik.errors.quantity3}
                helperText={formik.errors.quantity3}
                onChange={formik.handleChange}
              />
            </Box>
            <TextField
              id="product_available_ofert"
              margin="normal"
              required
              select
              autoComplete="product_available_ofert"
              name="visible"
              fullWidth
              label="Visible en web"
              value={formik.values.visible}
              error={!!formik.errors.visible}
              helperText={formik.errors.visible}
              onChange={formik.handleChange}
            >
              <MenuItem key="product_visible_true" value={true}>
                Si
              </MenuItem>
              <MenuItem key="product_visible_false" value={false}>
                No
              </MenuItem>
            </TextField>
            <TextField
              id="product_available_ofert"
              margin="normal"
              required
              select
              autoComplete="product_available_ofert"
              name="ofert"
              fullWidth
              label="Oferta destacada"
              value={formik.values.ofert}
              error={!!formik.errors.ofert}
              helperText={formik.errors.ofert}
              onChange={formik.handleChange}
            >
              <MenuItem key="product_visible_true" value={true}>
                Si
              </MenuItem>
              <MenuItem key="product_visible_false" value={false}>
                No
              </MenuItem>
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
            {isError && <Alert severity="error">Ha ocurrido un error, producto no creado</Alert>}
          </Box>

          <div className="box-wrapper">
            <img
              src={
                inputValue.img ||
                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
              }
              alt="pollo"
            />
            <div className="box-content">
              <div className="buy">
                <span>
                  <i className="fa fa-cart-plus" />
                </span>
              </div>
              <div className="title">{inputValue.product}</div>
              <div className="desc">{formik.values.description}</div>
              <span className="price">${formik.values.price1}</span>
            </div>
          </div>
          {/*  <Card
              sx={{
                maxWidth: "550px",
              }}
            >
              <CardMedia
                component="img"
                image={
                  inputValue.img ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
                alt="image product"
              />
              <CardContent sx={{ textAlign: "center" }}>
                <MDTypography variant="h2">{inputValue.product}</MDTypography>
                <MDTypography variant="h5">{`${formik.values.description} - Unidad: (${inputValue.unit})`}</MDTypography>
                <MDTypography variant="h4">${formik.values.price1}</MDTypography>
              </CardContent>
            </Card> */}
        </Box>
      </Box>
    </MDBox>
  );
}

export default OfertCreate;
