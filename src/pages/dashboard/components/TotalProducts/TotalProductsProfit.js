/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Avatar, Divider } from "@mui/material";
import { formatPrice } from "utils/formaPrice";
import { formatQuantity } from "utils/quantityFormat";
import { Link } from "react-router-dom";

function TotalProductsProfit({ totalProducts }) {
  const sliceProducts = totalProducts.slice(0, 19);

  return (
    <Card>
      <MDBox sx={{ flex: 1, padding: 3 }}>
        <MDTypography variant="h6"> Top 20 productos con mas ganancia</MDTypography>
        <MDTypography variant="button" fontWeight="regular" color="text">
          Desde el 21/03/2023.
        </MDTypography>
        <Divider />
        <MDBox
          mb={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MDBox sx={{ display: "flex", gap: 3, alignItems: "center", width: "58%" }}>
            <MDTypography variant="h6" ml={2}>
              PRODUCTO
            </MDTypography>
          </MDBox>

          <MDTypography
            variant="h6"
            sx={{
              width: "15%",
              textAlign: "center",
            }}
          >
            GANANCIA%
          </MDTypography>
          <MDTypography
            variant="h6"
            sx={{
              width: "15%",
              textAlign: "right",
            }}
          >
            GANANCIA
          </MDTypography>
        </MDBox>

        {sliceProducts.map((product) => (
          <MDBox
            mb={1}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MDBox sx={{ display: "flex", gap: 3, alignItems: "center", width: "58%" }}>
              <Avatar src={product?.img} />
              <Link to={`/productos/editar/${product?.productId}`}>
                <MDTypography variant="body2">{product.name}</MDTypography>
              </Link>
            </MDBox>

            <MDTypography variant="body2" sx={{ width: "15%", textAlign: "center" }}>
              {formatQuantity((product.totalProfits * 100) / product.totalCost)}%
            </MDTypography>

            <MDTypography variant="body2" mr={1} sx={{ width: "15%", textAlign: "right" }}>
              {formatPrice(product?.totalProfits)}
            </MDTypography>
          </MDBox>
        ))}
      </MDBox>
    </Card>
  );
}

export default TotalProductsProfit;
