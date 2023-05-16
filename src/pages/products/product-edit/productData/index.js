/* eslint-disable no-unused-vars */
import { Alert, Card } from "@mui/material";
import Loading from "components/DRLoading";
import React from "react";
import DataProduct from "./DataProduct";

function ProductData() {
  return (
    <Card
      sx={{
        mx: 2.5,
      }}
    >
      {/*   {(l1 || l2) && <Loading />}
      {(e1 || e2) && <Alert severity="error">Ha ocurrido un error</Alert>} */}
      <DataProduct />
    </Card>
  );
}

export default ProductData;
