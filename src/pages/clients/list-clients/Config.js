/* eslint-disable no-unused-vars */
import { LoadingButton } from "@mui/lab";
import { Alert, Box, TextField } from "@mui/material";
import { useSetConfigActiveClientMutation, usePutConfigMutation } from "api/configApi";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  inactiveDays: yup.number().required("Requerido"),
});

function Config({ config }) {
  const [editConfig, { isLoading: l1, isError: e1 }] = usePutConfigMutation();
  const [setConfigActiveClient, { isLoading: l2, isError: e2 }] =
    useSetConfigActiveClientMutation();

  const handleActiveClient = async () => {
    const res = await setConfigActiveClient().unwrap();
    if (res.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Servidor reiniciado con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      inactiveDays: config.inactiveDays,
    },
    onSubmit: async (values) => {
      const res = await editConfig({ ...values }).unwrap();
      if (res.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Configuración guardada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    validationSchema,
  });
  return (
    <Box p={2}>
      <Box
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <MDTypography variant="body2">
          Cantidad de días sin compras para que un cliente sea considerado{" "}
          <span style={{ color: "red", fontWeight: 800 }}>Inactivo</span>
        </MDTypography>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <TextField
            margin="normal"
            required
            type="number"
            name="inactiveDays"
            label="Dias sin compras"
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            value={formik.values.inactiveDays}
            error={!!formik.errors.inactiveDays}
            helperText={formik.errors.inactiveDays}
            onChange={formik.handleChange}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={l1}
            sx={{
              // backgroundColor: `${colors.info.main}`,
              color: "white !important",
            }}
          >
            Guardar
          </LoadingButton>
          <LoadingButton
            variant="contained"
            onClick={handleActiveClient}
            loading={l2}
            sx={{
              // backgroundColor: `${colors.info.main}`,
              color: "white !important",
            }}
          >
            Aplicar en servidor
          </LoadingButton>
        </Box>
      </Box>
      {(e1 || e2) && <Alert severity="error">Ha ocurrido, configuración no guardada</Alert>}
    </Box>
  );
}

export default Config;
