/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Card, Box, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "redux/cartSlice";

function ItemCart({ product }) {
  const [quantity, setQuantity] = useState(product.finalQuantity);
  const [value, setValue] = useState(product.finalPrice);
  const dispatch = useDispatch();

  const handlerQuantity = (e) => {
    setQuantity(e.target.value);

    dispatch(
      updateProduct({
        id: product._id,
        finalQuantity: e.target.value,
        finalPrice: value,
      })
    );
  };
  const handlerValue = (e) => {
    setValue(e.target.value);
    dispatch(
      updateProduct({
        id: product._id,
        finalQuantity: quantity,
        finalPrice: e.target.value,
      })
    );
  };
  return (
    <Card
      sx={{
        padding: "5px 20px",
        display: "flex",
        height: "75px",
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
        }}
      >
        <MDTypography variant="subtitle2" sx={{ width: "33%" }}>
          {product.description}
        </MDTypography>

        <TextField type="number" value={quantity} label="Cantidad" onChange={handlerQuantity} />
        <MDTypography variant="subtitle2" sx={{ width: "33%" }}>
          {product.product.unit}
        </MDTypography>

        <Box sx={{ width: "33%", display: "flex", alignItems: "center" }}>
          <span>
            <MDTypography variant="subtitle2">$</MDTypography>
          </span>
          <TextField type="number" value={value} label="Valor" onChange={handlerValue} />
        </Box>

        <MDButton onClick={() => dispatch(deleteProduct(product._id))}>
          <DeleteIcon />
        </MDButton>
      </Box>
    </Card>
  );
}

export default ItemCart;
