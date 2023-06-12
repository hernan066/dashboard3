import { Box, Divider } from "@mui/material";
import MDTypography from "components/MDTypography";
import { formatPrice } from "utils/formaPrice";
import { formatQuantity } from "utils/quantityFormat";

function DataProduct({ productById, ofertById, totalProductSell, totalProductSellLast30Days }) {
  console.log(totalProductSell);
  const stock = productById.stock.reduce((acc, curr) => acc + curr.stock, 0);
  const [totalSell] = totalProductSell;
  const [totalSell30days] = totalProductSellLast30Days;
  return (
    <Box p={3} sx={{ display: "flex", gap: "20px" }}>
      <Box sx={{ border: "1px solid #ccc", width: "550px" }}>
        <img src={productById?.img} alt={productById?.name} style={{ width: "100%" }} />
      </Box>
      <Box p={2} sx={{ border: "1px solid #ccc", flex: 1 }}>
        <MDTypography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "2px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {productById?.name}
        </MDTypography>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Categoría</MDTypography>
          <MDTypography variant="h6">{productById?.category.name}</MDTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Tipo de producto</MDTypography>
          <MDTypography variant="h6">{productById?.type}</MDTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Stock</MDTypography>
          <MDTypography variant="h6">{formatQuantity(stock)} kg</MDTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Precio Actual ({productById.unit})</MDTypography>
          <MDTypography variant="h6">{formatPrice(ofertById.retailPrice)}</MDTypography>
        </Box>

        <Divider />
        <MDTypography sx={{ margin: "5px 0" }} variant="h5">
          Ventas últimos 30 días
        </MDTypography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Cantidad vendida</MDTypography>
          <MDTypography variant="h6">{totalSell30days.count} kg</MDTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Total venta</MDTypography>
          <MDTypography variant="h6">{formatPrice(totalSell30days.total)}</MDTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Total ganancia</MDTypography>
          <MDTypography variant="h6">{formatPrice(totalSell30days.totalProfits)}</MDTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Total ganancia%</MDTypography>
          <MDTypography variant="h6">{`${formatQuantity(
            (totalSell30days.totalProfits * 100) / totalSell30days.total
          )}%`}</MDTypography>
        </Box>
        <Divider />
        <MDTypography sx={{ margin: "5px 0" }} variant="h5">
          Ventas totales (desde el 21/3)
        </MDTypography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Cantidad vendida</MDTypography>
          <MDTypography variant="h6">{totalSell.count} kg</MDTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Total venta</MDTypography>
          <MDTypography variant="h6">{formatPrice(totalSell.total)}</MDTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Total ganancia</MDTypography>
          <MDTypography variant="h6">{formatPrice(totalSell.totalProfits)}</MDTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MDTypography variant="h6">Total ganancia%</MDTypography>
          <MDTypography variant="h6">{`${formatQuantity(
            (totalSell.totalProfits * 100) / totalSell.total
          )}%`}</MDTypography>
        </Box>
      </Box>
    </Box>
  );
}

export default DataProduct;
