/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Card, CardContent, CardMedia, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { creteProductSchema } from "validations/products/createProductYup";
import { useState } from "react";
import Swal from "sweetalert2";
import { usePutProductMutation } from "api/productApi";
import ImageUpload from "./ImageUpload";

function ProductEdit({ listCategories, productById }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editProduct, { isLoading, error }] = usePutProductMutation();
  const [urlImage, setUrlImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: productById.name,
      brand: productById.brand,
      unit: productById.unit,
      type: productById.type,
      category: productById?.category?._id,
      description: productById.description,
      img: productById.img,
      available: productById.available,
    },
    onSubmit: async (values) => {
      const editProductValues = {
        ...values,
        img: urlImage || productById.img,
      };

      await editProduct({ id, ...editProductValues }).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto editado con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      /*  navigate("/productos/lista"); */
    },
    validationSchema: creteProductSchema,
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
        <Box sx={{ mt: 1, mx: 2, display: "flex", gap: 3, width: "100%" }}>
          <Box
            sx={{
              flex: 1,
            }}
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              margin="normal"
              required
              autoComplete="product_name"
              fullWidth
              autoFocus
              id="product_name"
              label="Nombre del producto"
              name="name"
              value={formik.values.name}
              error={!!formik.errors.name || error?.name?.msg}
              helperText={formik.errors.name || error?.name?.msg}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="product_brand"
              name="brand"
              label="Marca"
              id="product_brand"
              value={formik.values.brand}
              error={!!formik.errors.brand}
              helperText={formik.errors.brand}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="product_unit"
              id="product_unit"
              label="Unidad"
              name="unit"
              value={formik.values.unit}
              error={!!formik.errors.unit}
              helperText={formik.errors.unit}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="product_type"
              name="type"
              label="Tipo"
              id="product_type"
              value={formik.values.type}
              error={!!formik.errors.type}
              helperText={formik.errors.type}
              onChange={formik.handleChange}
            />

            <TextField
              id="product_category"
              margin="normal"
              required
              select
              autoComplete="product_category"
              name="category"
              fullWidth
              label="Categoria"
              value={formik.values.category}
              error={!!formik.errors.category}
              helperText={formik.errors.category}
              onChange={formik.handleChange}
            >
              {listCategories.categories.map((option) => (
                <MenuItem
                  key={option._id}
                  value={option._id}
                  selected={formik.values.category === option._id}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="product_available"
              margin="normal"
              required
              select
              autoComplete="product_available"
              name="available"
              fullWidth
              label="Producto disponible"
              value={formik.values.available}
              error={!!formik.errors.available}
              helperText={formik.errors.available}
              onChange={formik.handleChange}
            >
              <MenuItem
                key="product_available_true"
                value={true}
                selected={formik.values.available === true}
              >
                Si
              </MenuItem>
              <MenuItem
                key="product_available_false"
                value={false}
                selected={formik.values.available === false}
              >
                No
              </MenuItem>
            </TextField>

            <Box display="flex" alignItems="center">
              <TextField
                margin="normal"
                fullWidth
                name="img"
                label="Imagen del producto"
                id="user_flor"
                value={urlImage || formik.values.img}
                error={!!formik.errors.img}
                helperText={formik.errors.img}
                onChange={formik.handleChange}
              />
            </Box>

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
                mr: 2,
                /*   borderColor: colors.blueAccent[400],
                    color: colors.blueAccent[400],
                    "&:hover": { backgroundColor: colors.blueAccent[900] }, */
              }}
            >
              Cancelar
            </MDButton>
            <MDButton
              variant="outlined"
              color="info"
              onClick={() => navigate("productos/lista")}
              sx={{
                mt: 3,
                mb: 2,
                /*   borderColor: colors.blueAccent[400],
                    color: colors.blueAccent[400],
                    "&:hover": { backgroundColor: colors.blueAccent[900] }, */
              }}
            >
              Ir a lista de productos
            </MDButton>
            {error && (
              <Alert severity="error">Ha ocurrido un error, producto no ha sido editado</Alert>
            )}
          </Box>

          <Box>
            <Card
              sx={{
                maxWidth: "320px",
              }}
            >
              <CardMedia
                component="img"
                image={
                  productById.img ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
                alt="image product"
              />
              <CardContent>
                <ImageUpload setUrlImage={setUrlImage} />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default ProductEdit;
