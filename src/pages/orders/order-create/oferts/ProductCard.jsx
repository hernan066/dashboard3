/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const [disable, setDisable] = useState(false);

  const handlerClick = () => {
    dispatch(
      addProduct({
        ...product,
        finalPrice: product.prices[0].price1,
        finalQuantity: product.quantities[0].quantity1,
      })
    );
    setDisable(true);
  };

  return (
    <Card
      sx={{
        padding: "5px 20px",
        display: "flex",
        height: "65px",
        flexDirection: "row",
        alignItems: "center",
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
        <MDTypography variant="subtitle2" sx={{ width: "33%" }}>
          {product.quantities[0].quantity1} {product.product.unit}
        </MDTypography>
        <MDTypography variant="subtitle2" sx={{ width: "33%" }}>
          ${product.prices[0].price1}
        </MDTypography>
        <MDButton color="dark" variant="gradient" onClick={handlerClick} disabled={disable}>
          {disable ? "Agregado" : "Agregar"}
        </MDButton>
      </Box>
    </Card>
  );
}

export default ProductCard;
