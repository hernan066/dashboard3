/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Card, Box, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MDTypography from "components/MDTypography";

import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct, isValidStockOrder } from "redux/cartSlice";
import { formatQuantity } from "utils/quantityFormat";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";

function ItemCart({ product }) {
  const dispatch = useDispatch();
  console.log(product);

  const formik = useFormik({
    initialValues: {
      value: product.finalPrice,
      quantity: product.finalQuantity,
    },

    validationSchema: yup.object().shape({
      quantity: yup
        .number()
        .required("Requerido")
        .positive("Valor invalido")
        .max(product.stock.stock, "Valor mayor al stock"),
      value: yup.number().required("Requerido"),
    }),
  });

  useEffect(() => {
    dispatch(
      updateProduct({
        id: product._id,
        finalQuantity: formik.values.quantity,
        finalPrice: formik.values.quantity * formik.values.value,
        basePrice: formik.values.value,
      })
    );
    if (formik.values.quantity > product.stock.stock) {
      dispatch(isValidStockOrder(false));
    } else {
      dispatch(isValidStockOrder(true));
    }
  }, [formik.values]);

  return (
    <Card
      sx={{
        padding: "5px 20px",
        display: "flex",
        minHeight: "75px",
        flexDirection: "row",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box
        sx={{
          width: 60,
          mr: 2,
        }}
      >
        <img
          src={product.product.img}
          alt=""
          style={{
            width: "100%",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",

          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          gap: "10px",
        }}
      >
        <MDTypography variant="subtitle2" sx={{ width: "30%" }}>
          {product.description} || {formatQuantity(product.stock.stock)} unid.
        </MDTypography>

        <Box sx={{ width: "23%", display: "flex", alignItems: "center" }}>
          <TextField
            type="number"
            label="Cantidad"
            focused
            name="quantity"
            InputProps={{ inputProps: { min: "0", step: "1" } }}
            value={formik.values.quantity}
            error={!!formik.errors.quantity}
            helperText={formik.errors.quantity}
            onChange={formik.handleChange}
          />
        </Box>

        <Box sx={{ width: "23%", display: "flex", alignItems: "center" }}>
          <span>
            <MDTypography variant="subtitle2">$</MDTypography>
          </span>
          <TextField
            type="number"
            label="Valor Unidad"
            name="value"
            value={formik.values.value}
            error={!!formik.errors.value}
            helperText={formik.errors.value}
            onChange={formik.handleChange}
          />
        </Box>

        <Box sx={{ width: "23%", display: "flex", alignItems: "center" }}>
          <span>
            <MDTypography variant="subtitle2">$</MDTypography>
          </span>
          <TextField
            type="number"
            value={formik.values.value * formik.values.quantity}
            label="Valor total"
            disabled="true"
          />
        </Box>

        <MDButton onClick={() => dispatch(deleteProduct(product._id))}>
          <DeleteIcon />
        </MDButton>
      </Box>
    </Card>
  );
}

export default ItemCart;
