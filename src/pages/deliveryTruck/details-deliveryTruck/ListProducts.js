/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import { Avatar, Box, Divider, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { formatPrice } from "utils/formaPrice";
import { formatQuantity } from "utils/quantityFormat";

function ListProducts({ listProducts }) {
  const totalBuy = listProducts.reduce((acc, curr) => acc + curr.totalQuantity, 0);
  return (
    <Box m={2} mt={4} sx={{ border: "1px solid #ccc", borderRadius: "5px" }}>
      <MDBox p={3}>
        <MDTypography variant="h6">Productos vendidos</MDTypography>
        <MDBox display="flex" alignItems="center" lineHeight={0}>
          <Icon
            sx={{
              fontWeight: "bold",
              color: ({ palette: { info } }) => info.main,
              mt: -0.5,
            }}
          >
            done
          </Icon>
          <MDTypography variant="button" fontWeight="regular" color="text">
            &nbsp;<strong>{formatQuantity(totalBuy)} unidades</strong>
          </MDTypography>
        </MDBox>
        <Divider />
        <MDBox
          mb={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MDBox sx={{ display: "flex", gap: 3, alignItems: "center", width: "35%" }}>
            <MDTypography color="text" variant="h6" ml={2} sx={{ letterSpacing: "2px" }}>
              PRODUCTO
            </MDTypography>
          </MDBox>

          <MDTypography
            variant="h6"
            color="text"
            sx={{
              width: "33%",
              textAlign: "center",

              letterSpacing: "2px",
            }}
          >
            DESCRIPCION
          </MDTypography>
          <MDTypography
            variant="h6"
            color="text"
            sx={{
              width: "15%",
              textAlign: "center",

              letterSpacing: "2px",
            }}
          >
            CANTIDAD
          </MDTypography>
          <MDTypography
            variant="h6"
            color="text"
            sx={{
              width: "15%",
              textAlign: "right",

              letterSpacing: "2px",
            }}
          >
            TOTAL
          </MDTypography>
        </MDBox>
        <Divider />

        {listProducts.map((product) => (
          <MDBox
            mb={1}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MDBox sx={{ display: "flex", gap: 3, alignItems: "center", width: "35%" }}>
              <Avatar src={product.img} />
              <MDTypography variant="body2">{product.name}</MDTypography>
            </MDBox>

            <MDTypography variant="body2" sx={{ width: "35%", textAlign: "center" }}>
              {product.description}
            </MDTypography>
            <MDTypography variant="h6" sx={{ width: "15%", textAlign: "center" }}>
              {formatQuantity(product.totalQuantity)}
            </MDTypography>
            <MDTypography variant="h6" mr={1} sx={{ width: "15%", textAlign: "right" }}>
              {formatPrice(product.totalPrice)}
            </MDTypography>
          </MDBox>
        ))}
      </MDBox>
    </Box>
  );
}

export default ListProducts;
