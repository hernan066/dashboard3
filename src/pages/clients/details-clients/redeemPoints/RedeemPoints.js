/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import Swal from "sweetalert2";
import { creteProductLotsSchema } from "validations/productsLots/creteProductsLotsYup";
import MDTypography from "components/MDTypography";
import { usePostPointsMutation } from "api/pointsApi";
import * as yup from "yup";

const pointsSchema = yup.object().shape({
  points: yup.number().required("Requerido"),
});

function RedeemPoints() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatePoints, { isLoading, isError }] = usePostPointsMutation();

  const formik = useFormik({
    initialValues: {
      points: null,
    },
    onSubmit: async (values) => {
      const data = {
        clientId: id,
        points: -values.points,
        action: "exchange",
      };
      const res = await updatePoints(data).unwrap();

      if (res.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Puntos canjeados con éxito con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    validationSchema: pointsSchema,
  });

  return (
    <MDBox pt={3} pb={3}>
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
              required
              name="points"
              type="number"
              label="Puntos a canjear"
              value={formik.values.points}
              error={!!formik.errors.points}
              helperText={formik.errors.points}
              onChange={formik.handleChange}
            />
            <MDTypography variant="body2">
              Estos puntos serán restados del total de puntos del cliente.
            </MDTypography>

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
              Canjear
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
            {isError && <Alert severity="error">Ha ocurrido un error, puntos no canjeados</Alert>}
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default RedeemPoints;
