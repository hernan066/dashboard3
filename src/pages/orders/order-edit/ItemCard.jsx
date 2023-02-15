/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Card, Box, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrder, deleteProductOrder } from "redux/ordersSlice";

function ItemCard({ product }) {
  console.log(product);
  const [quantity, setQuantity] = useState(product.totalQuantity);
  const [value, setValue] = useState(product.totalPrice);
  const dispatch = useDispatch();

  const handlerQuantity = (e) => {
    setQuantity(e.target.value);

    dispatch(
      updateOrder({
        id: product._id,
        totalQuantity: e.target.value,
        totalPrice: value,
      })
    );
  };
  const handlerValue = (e) => {
    setValue(e.target.value);

    dispatch(
      updateOrder({
        id: product._id,
        totalQuantity: quantity,
        totalPrice: e.target.value,
      })
    );
  };

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
          src={product.img}
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
          {product.description}
        </MDTypography>

        <Box sx={{ width: "23%", display: "flex", alignItems: "center" }}>
          <TextField type="number" value={quantity} label="Cantidad" onChange={handlerQuantity} />
        </Box>

        <Box sx={{ width: "23%", display: "flex", alignItems: "center" }}>
          <span>
            <MDTypography variant="subtitle2">$</MDTypography>
          </span>
          <TextField type="number" value={value} label="Valor total" onChange={handlerValue} />
        </Box>

        <Box sx={{ width: "23%", display: "flex", alignItems: "center" }}>
          <span>
            <MDTypography variant="subtitle2">$</MDTypography>
          </span>
          <TextField
            type="number"
            value={value / quantity}
            label="Unidad"
            disabled="true"
            /*  onChange={handlerValue} */
          />
        </Box>

        <MDButton onClick={() => dispatch(deleteProductOrder(product._id))}>
          <DeleteIcon />
        </MDButton>
      </Box>
    </Card>
  );
}

export default ItemCard;
