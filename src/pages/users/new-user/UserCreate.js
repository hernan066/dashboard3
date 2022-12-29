/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import apiRequest from "api/apiRequest";
import { creteUserSchema } from "validations/users/createUserYup";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";

function UserCreate({ roles }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    },
    onSubmit: async ({ name, lastName, email, password, phone, role }) => {
      setIsLoading(true);
      try {
        const { data } = await apiRequest.post("/user", {
          name,
          lastName,
          email,
          phone,
          password,
          role,
        });
        if (data.ok) {
          /*  Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario creado",
            showConfirmButton: false,
            timer: 2000,
          }); */
          setError([]);
          navigate("/users");
        }
        setIsLoading(false);
      } catch (err) {
        await setError(err.response.data);
        console.log(err);
        setIsLoading(false);
      }
    },
    validationSchema: creteUserSchema,
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
              autoComplete="user_name"
              fullWidth
              autoFocus
              id="user_name"
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
              autoComplete="User_lastName"
              name="lastName"
              label="Apellido"
              id="User_lastName"
              error={!!formik.errors.lastName}
              helperText={formik.errors.lastName}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="user_email"
              id="user_email"
              label="Email"
              name="email"
              error={!!formik.errors.email || error.email?.msg}
              helperText={formik.errors.email || error.email?.msg}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="user_email"
              name="phone"
              label="Telefono"
              id="user_email"
              error={!!formik.errors.phone || error.phone?.msg}
              helperText={formik.errors.phone || error.phone?.msg}
              onChange={formik.handleChange}
            />
            <TextField
              id="user_role"
              margin="normal"
              required
              select
              autoComplete="off"
              name="role"
              fullWidth
              label="Rol"
              value={formik.values.role}
              error={!!formik.errors.role}
              helperText={formik.errors.role}
              onChange={formik.handleChange}
            >
              {roles.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.role}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="user_password"
              name="password"
              label="Password"
              type="password"
              id="user_password"
              error={!!formik.errors.password}
              helperText={formik.errors.password}
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
                /*   borderColor: colors.blueAccent[400],
                    color: colors.blueAccent[400],
                    "&:hover": { backgroundColor: colors.blueAccent[900] }, */
              }}
            >
              Cancelar
            </MDButton>
          </Box>

          {/*  <Box sx={{ width: "50%" }}>
            <TextField
              margin="normal"
              fullWidth
              autoComplete="user_address"
              name="address"
              label="Dirección"
              id="user_address"
              error={!!formik.errors.address}
              helperText={formik.errors.address}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              autoComplete="off"
              name="flor"
              label="Piso(opcional)"
              id="user_flor"
              error={!!formik.errors.flor}
              helperText={formik.errors.flor}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              autoComplete="user_department"
              name="department"
              label="Departamento(opcional)"
              id="user_department"
              error={formik.errors.department}
              helperText={formik.errors.department}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              autoComplete="user_province"
              name="province"
              label="Provincia"
              id="user_province"
              error={!!formik.errors.province}
              helperText={formik.errors.province}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              autoComplete="user_city"
              name="city"
              label="Ciudad"
              id="user_city"
              error={!!formik.errors.city}
              helperText={formik.errors.city}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              autoComplete="user_zip"
              name="zip"
              label="Código Postal"
              id="user_zip"
              type="number"
              error={!!formik.errors.zip}
              helperText={formik.errors.zip}
              onChange={formik.handleChange}
            />
          </Box> */}
        </Box>
      </Box>
    </MDBox>
  );
}

export default UserCreate;
