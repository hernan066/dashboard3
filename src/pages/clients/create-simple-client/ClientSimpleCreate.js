/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { usePostClientMutation } from "api/clientsApi";
import { usePostUserMutation } from "api/userApi";
import Swal from "sweetalert2";
import { createSimpleClientSchema } from "validations/client/createSimpleClientYup";

function SimpleClientCreate() {
  const navigate = useNavigate();

  const [createClient, { isLoading: l1, isError: e1 }] = usePostClientMutation();
  const [createUser, { isLoading: l2, isError: e2 }] = usePostUserMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      dni: "",
    },
    onSubmit: async ({ name, lastName, email, phone, dni }) => {
      try {
        const user = {
          name,
          lastName,
          email,
          phone,
          password: "abx321",
          role: "636a6311c2e277ca644463fb",
          verified: true,
        };

        const res = await createUser(user).unwrap();
        console.log(res);
        if (res.ok) {
          const client = {
            user: res.data.id,
            clientType: "63b34fef55257d408a217911",
            clientCategory: "636a8e3e8b0abe9de10c7948",
            cuit: dni,
            contactMeans: "",
            campaignName: "",
          };

          const res2 = await createClient(client).unwrap();
          console.log(res2);
          if (res2) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Cliente creado con éxito",
              showConfirmButton: false,
              timer: 2500,
            });
            navigate("/clientes/lista");
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: createSimpleClientSchema,
  });

  return (
    <MDBox pt={6} pb={3}>
      <Box
        sx={{
          display: "flex",
          gap: 5,
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1, mx: 2, display: "flex", gap: 3, width: "100%" }}
        >
          <Box sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nombre/s"
              name="name"
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
              error={!!formik.errors.lastName}
              helperText={formik.errors.lastName}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              error={!!formik.errors.email}
              helperText={formik.errors.email}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Telefono"
              error={!!formik.errors.phone}
              helperText={formik.errors.phone}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              type="number"
              required
              fullWidth
              name="dni"
              label="DNI"
              error={!!formik.errors.dni}
              helperText={formik.errors.dni}
              onChange={formik.handleChange}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={l1 || l2}
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
                /*   borderColor: colors.blueAccent[400],
                    color: colors.blueAccent[400],
                    "&:hover": { backgroundColor: colors.blueAccent[900] }, */
              }}
            >
              Cancelar
            </MDButton>
            {e1 || (e2 && <Alert severity="error">Error — Cliente no creado</Alert>)}
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default SimpleClientCreate;
