/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.cart);
  const itemCart = products.find((item) => item._id === product._id);

  const handlerClick = () => {
    dispatch(
      addProduct({
        ...product,
        finalPrice: product.basePrice,
        finalQuantity: 1,
      })
    );
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
          1 unidad
        </MDTypography>
        <MDTypography variant="subtitle2" sx={{ width: "33%" }}>
          ${product.basePrice}
        </MDTypography>
        <MDButton color="dark" variant="gradient" onClick={handlerClick} disabled={itemCart}>
          {!itemCart ? "Agregar" : "Agregado"}
        </MDButton>
      </Box>
    </Card>
  );
}

export default ProductCard;
