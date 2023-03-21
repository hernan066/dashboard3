/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Card, MenuItem, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "redux/cartSlice";
import { dateToLocalDateMin } from "utils/dateFormat";
import { formatPrice } from "utils/formaPrice";
import { formatQuantity } from "utils/quantityFormat";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.cart);
  const itemCart = products.find((item) => item._id === product._id);
  const productWithStock = product.product.stock.filter((item) => item.stock > 0);
  const [stockId, setStockId] = useState(productWithStock[0]?._id);

  console.log(productWithStock);

  const [filterStock] = productWithStock.filter((item) => item._id === stockId);
  const totalStock = product.product.stock.reduce((acc, curr) => curr.stock + acc, 0);
  // console.log(filterStock);

  const handlerClick = () => {
    dispatch(
      addProduct({
        ...product,
        stock: filterStock || productWithStock[0],
        finalPrice: product.basePrice,
        finalQuantity: 1,
      })
    );
  };

  // console.log(cost);
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
        {/*   -----Nombre------- */}
        <MDTypography variant="subtitle2" sx={{ width: "40%" }}>
          {product.description}
        </MDTypography>
        {/*   -----Costo------- */}
        {product.product.stock.length > 0 ? (
          <MDTypography
            variant="h6"
            sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            {formatPrice(filterStock?.unityCost)}
          </MDTypography>
        ) : (
          <MDTypography
            variant="h6"
            sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            .......
          </MDTypography>
        )}

        {/*   -----Precio------- */}
        <MDTypography
          variant="h6"
          sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          {formatPrice(product.basePrice)}
        </MDTypography>
        {productWithStock.length === 1 && (
          <MDTypography
            variant="h6"
            color="info"
            sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            {formatQuantity(totalStock)} unid.
          </MDTypography>
        )}
        {productWithStock.length === 0 && (
          <MDTypography
            variant="h6"
            color="error"
            sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            Sin stock
          </MDTypography>
        )}
        {productWithStock.length > 1 && (
          <Box
            pr={3}
            sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              margin="small"
              required
              select
              name="selectionStock"
              fullWidth
              label="Ubicación Stock"
              value={stockId}
              onChange={(e) => setStockId(e.target.value)}
            >
              {productWithStock.map((st) => (
                <MenuItem key={st._id} value={st._id}>
                  {formatQuantity(st.stock)} unid. || {st.location} ||{" "}
                  {dateToLocalDateMin(st.createdStock)}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
        {product.product.stock.length === 0 && (
          <MDButton color="error" variant="gradient" disabled="true">
            Sin Stock
          </MDButton>
        )}
        {product.product.stock.length > 0 && (
          <MDButton color="dark" variant="gradient" onClick={handlerClick} disabled={itemCart}>
            {!itemCart ? "Agregar" : "Agregado"}
          </MDButton>
        )}
      </Box>
    </Card>
  );
}

export default ProductCard;
