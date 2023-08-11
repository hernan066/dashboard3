import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Card, CardContent, CardMedia, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { usePostCategoryMutation } from "api/categoryApi";
import { useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import ImageUpload from "./ImageUpload";

const validationSchema = yup.object().shape({
  name: yup.string().required("Requerido"),
});

function CategoryCreate() {
  const navigate = useNavigate();

  const [createCategory, { isLoading, isError }] = usePostCategoryMutation();
  const [urlImage, setUrlImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      img: urlImage || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
    },
    onSubmit: async (values) => {
      const newCategory = {
        ...values,
        img: urlImage,
      };
      const res = await createCategory(newCategory).unwrap();
      if (res.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Categoria creada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    validationSchema,
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
        <Box sx={{ mt: 1, mx: 2, display: "flex", gap: 3, flex: 1 }}>
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
              fullWidth
              autoFocus
              label="Nombre de categoria"
              name="name"
              error={!!formik.errors.name}
              helperText={formik.errors.name}
              onChange={formik.handleChange}
            />

            <Box display="flex" alignItems="center">
              <TextField
                margin="normal"
                fullWidth
                name="img"
                label="Imagen del producto"
                id="user_flor"
                value={urlImage}
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
              Volver
            </MDButton>
            {isError && <Alert severity="error">Ha ocurrido un error, producto no creado</Alert>}
          </Box>

          <Box>
            <Card
              sx={{
                maxWidth: "550px",
              }}
            >
              <CardMedia
                component="img"
                image={
                  urlImage ||
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

export default CategoryCreate;
