/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, MenuItem, TextField } from "@mui/material";
import apiRequest from "api/apiRequest";
import MDBox from "components/MDBox";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDispatch } from "redux/userSlice";
import { editUserSchema } from "validations/users/editUserYup";
import Swal from "sweetalert2";
import colors from "assets/theme/base/colors";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import AvatarUpload from "./AvatarUpload";

function UserEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { editUser } = useSelector((store) => store.user);
  const { token } = useSelector((store) => store.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getRoles = async () => {
      const { data } = await apiRequest.get("/roles");
      setRoles(data.data.roles);
    };
    getRoles();
  }, [setRoles]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await apiRequest.get(`/user/${id}`);
      const userResponse = data.data.user;
      setUser(userResponse);
      dispatch(getUserDispatch(userResponse));
    };
    getUser();
  }, [setUser]);

  const formik = useFormik({
    initialValues: {
      name: editUser?.name,
      lastName: editUser?.lastName,
      email: editUser?.email,
      // password: editUser?.password,
      phone: editUser?.phone,
      role: editUser?.role || "",
      address: editUser?.userAddresses[0].address,
      flor: editUser?.userAddresses[0].flor,
      department: editUser?.userAddresses[0].department,
      province: editUser?.userAddresses[0].province,
      city: editUser?.userAddresses[0].city,
      zip: editUser?.userAddresses[0].zip,
    },
    onSubmit: async ({
      name,
      lastName,
      email,
      password,
      phone,
      role,
      address,
      flor,
      department,
      province,
      city,
      zip,
    }) => {
      setIsLoading(true);
      try {
        const { data } = await apiRequest.put(`/user/${user._id}`, {
          name,
          lastName,
          email,
          phone,
          password,
          role,
          userAddresses: [
            {
              address,
              flor,
              department,
              city,
              province,
              zip,
            },
          ],
        });

        if (data.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario editado",
            showConfirmButton: false,
            timer: 2000,
          });
          setError([]);
          navigate("/users");
        }
        setIsLoading(false);
      } catch (err) {
        await setError(error.response.data);
        console.log(err);
        setIsLoading(false);
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
          <AvatarUpload user={user} token={token} />
        </Grid>

        <Grid sx={4}>
          <Card>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ p: 5, display: "flex", gap: 3 }}
            >
              <MDBox sx={{ width: "50%" }}>
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
                  error={!!formik.errors.email || error.email?.msg}
                  helperText={formik.errors.email || error.email?.msg}
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
                  error={!!formik.errors.phone || error.phone?.msg}
                  helperText={formik.errors.phone || error.phone?.msg}
                  onChange={formik.handleChange}
                />
                {}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  disabled={true}
                  name="password"
                  label="Password"
                  type="password"
                  id="user_password"
                  autoComplete="current-password"
                  error={!!formik.errors.password}
                  helperText={formik.errors.password}
                  onChange={formik.handleChange}
                />
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
                  {roles.map((option) => (
                    <MenuItem
                      key={option._id}
                      value={option._id}
                      selected={formik.values.role === option._id}
                    >
                      {option.role}
                    </MenuItem>
                  ))}
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
                    /*    borderColor: colors.blueAccent[400],
                  color: colors.blueAccent[400],
                  "&:hover": { backgroundColor: colors.blueAccent[900] }, */
                  }}
                >
                  Cancelar
                </MDButton>
              </MDBox>

              <MDBox sx={{ width: "50%" }}>
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
              </MDBox>
            </Box>
          </Card>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default UserEdit;
