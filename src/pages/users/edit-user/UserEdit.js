/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */

import { LoadingButton } from "@mui/lab";
import { Alert, Box, Card, Grid, MenuItem, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { editUserSchema } from "validations/users/editUserYup";
import Swal from "sweetalert2";
import colors from "assets/theme/base/colors";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { usePutUserMutation } from "api/userApi";
import AvatarUpload from "./AvatarUpload";

function UserEdit({ listRoles, user: editUser }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editUserMutation, { isLoading, isError }] = usePutUserMutation();

  const formik = useFormik({
    initialValues: {
      name: editUser?.name,
      lastName: editUser?.lastName,
      email: editUser?.email,
      // password: editUser?.password,
      phone: editUser?.phone,
      role: editUser?.role || "",
      verified: editUser?.verified || "",
    },
    onSubmit: async ({ name, lastName, email, password, phone, role, verified }) => {
      const editUserValues = {
        name,
        lastName,
        email,
        phone,
        password,
        role,
        verified,
      };

      const { data } = await editUserMutation({ id, ...editUserValues }).unwrap();
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario editado con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/usuarios/lista");
      }
    },
    validationSchema: editUserSchema,
    enableReinitialize: true,
  });

  return (
    <MDBox px={3} py={3}>
      <MDBox
        sx={{
          display: "flex",
          gap: 5,
        }}
      >
        <Grid sx={4}>
          <AvatarUpload user={editUser} />
        </Grid>

        <Grid sx={4}>
          <Card>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ p: 5, display: "flex", gap: 3, width: "100%" }}
            >
              <MDBox sx={{ width: "100%" }}>
                <MDTypography>Datos personales</MDTypography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user_name"
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
                  id="User_lastName"
                  value={formik.values.lastName}
                  error={!!formik.errors.lastName}
                  helperText={formik.errors.lastName}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user_email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
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
                  id="user_phone"
                  value={formik.values.phone}
                  error={!!formik.errors.phone}
                  helperText={formik.errors.phone}
                  onChange={formik.handleChange}
                />
                {}

                <TextField
                  id="user_role"
                  margin="normal"
                  select
                  required
                  name="role"
                  fullWidth
                  label="Rol"
                  value={formik.values.role}
                  error={!!formik.errors.role}
                  helperText={formik.errors.role}
                  onChange={formik.handleChange}
                >
                  {listRoles.map((option) => (
                    <MenuItem
                      key={option._id}
                      value={option._id}
                      selected={formik.values.role === option._id}
                    >
                      {option.role}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  margin="normal"
                  select
                  required
                  name="verified"
                  fullWidth
                  label="Verificado"
                  value={formik.values.verified}
                  error={!!formik.errors.verified}
                  helperText={formik.errors.verified}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={true} selected={formik.values.verified === true}>
                    Si
                  </MenuItem>
                  <MenuItem value={false} selected={formik.values.verified === false}>
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
                    "&:hover": { backgroundColor: colors.info.state },
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
                {isError && (
                  <Alert severity="error">Ha ocurrido un error, usuario no editado</Alert>
                )}
              </MDBox>

              {/*  <MDBox sx={{ width: "50%" }}>
                <MDTypography>Dirección</MDTypography>
                <TextField
                  margin="normal"
                  fullWidth
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
                  name="flor"
                  label="Piso(opcional)"
                  id="user_flor"
                  value={formik.values.flor}
                  error={!!formik.errors.flor}
                  helperText={formik.errors.flor}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="department"
                  label="Departamento(opcional)"
                  id="user_department"
                  value={formik.values.department}
                  error={formik.errors.department}
                  helperText={formik.errors.department}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
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
                  name="zip"
                  label="Código Postal"
                  id="user_zip"
                  type="number"
                  value={formik.values.zip}
                  error={!!formik.errors.zip}
                  helperText={formik.errors.zip}
                  onChange={formik.handleChange}
                />
              </MDBox> */}
            </Box>
          </Card>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default UserEdit;
