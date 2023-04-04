/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Card, Box, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrder, deleteProductOrder, updateStock } from "redux/ordersSlice";

function ItemCard({ product }) {
  const [quantity, setQuantity] = useState(product.totalQuantity);
  const [value, setValue] = useState(product.unitPrice);
  const [cost, setCost] = useState(product.unitCost);
  const dispatch = useDispatch();

  console.log(product);
  const handlerQuantity = (e) => {
    setQuantity(e.target.value);
    dispatch(
      updateStock({
        stockId: product.stockId,
        newQuantity: e.target.value,
      })
    );

    dispatch(
      updateOrder({
        id: product._id,
        totalQuantity: e.target.value,
        totalPrice: value * e.target.value,
        unitPrice: value,
        unitCost: cost,
      })
    );
  };
  const handlerValue = (e) => {
    setValue(e.target.value);

    dispatch(
      updateOrder({
        id: product._id,
        totalQuantity: quantity,
        totalPrice: e.target.value * quantity,
        unitPrice: e.target.value,
        unitCost: cost,
      })
    );
  };
  const handlerCost = (e) => {
    setCost(e.target.value);

    dispatch(
      updateOrder({
        id: product._id,
        totalQuantity: quantity,
        totalPrice: value * quantity,
        unitPrice: value,
        unitCost: e.target.value,
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteProductOrder(product._id));
    dispatch(
      updateStock({
        stockId: product.stockId,
        newQuantity: 0,
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
          width: 75,
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
          {product.name}
        </MDTypography>

        <Box sx={{ width: "23%", display: "flex", alignItems: "center" }}>
          <TextField type="number" value={quantity} label="Cantidad" onChange={handlerQuantity} />
        </Box>

        <Box sx={{ width: "23%", display: "flex", alignItems: "center" }}>
          <span>
            <MDTypography variant="subtitle2">$</MDTypography>
          </span>
          <TextField type="number" value={value} label="Unidad" onChange={handlerValue} />
        </Box>

        <Box sx={{ width: "23%", display: "flex", alignItems: "center" }}>
          <span>
            <MDTypography variant="subtitle2">$</MDTypography>
          </span>
          <TextField
            type="number"
            value={value * quantity}
            label="Total"
            disabled="true"
            /*  onChange={handlerValue} */
          />
        </Box>
        <Box sx={{ width: "23%", display: "flex", alignItems: "center" }}>
          <span>
            <MDTypography variant="subtitle2">$</MDTypography>
          </span>
          <TextField type="number" value={cost} label="Costo" onChange={handlerCost} />
        </Box>

        <MDButton onClick={handleDelete}>
          <DeleteIcon />
        </MDButton>
      </Box>
    </Card>
  );
}

export default ItemCard;
