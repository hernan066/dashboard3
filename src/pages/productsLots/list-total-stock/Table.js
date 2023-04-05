/* eslint-disable no-unneeded-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Avatar, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import colors from "assets/theme-dark/base/colors";
import { useMaterialUIController } from "context";
import { formatQuantity } from "utils/quantityFormat";

function TableListTotalStock({ actualStock: stock }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const columns = [
    {
      field: "img",
      headerName: "Imagen",
      width: 100,
      renderCell: (params) => <Avatar src={params.row.img} />,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "name",
      headerName: "Producto",
      flex: 2,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "quantityBuy",
      headerName: "Cant. Comprada",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: ({ row: { quantityBuy } }) => (
        <div
          style={{
            color: "blue",
            fontWeight: 700,
          }}
        >
          {quantityBuy}
        </div>
      ),
    },
    {
      field: "actualStock",
      headerName: "Cant. Actual",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: ({ row: { actualStock } }) => (
        <div
          style={{
            color: "black",
            fontWeight: 700,
          }}
        >
          {actualStock}
        </div>
      ),
    },

    {
      field: "stock1",
      headerName: "Cant. Actual %",
      flex: 0.7,
      headerClassName: "super-app-theme--header",
      renderCell: ({ row: { actualStock, quantityBuy } }) => (
        <div
          style={{
            height: "20px",
            width: "100%",
            position: "relative",
            color: "black",
            fontWeight: 700,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #49a3f1",
            backgroundColor: "#eee",
          }}
        >
          <p style={{ zIndex: "2" }}>{Math.trunc((actualStock * 100) / quantityBuy)}%</p>
          <span
            style={{
              position: "absolute",
              background: "#49a3f1",
              height: "19px",
              width: `${Math.trunc((actualStock * 100) / quantityBuy)}%`,
              top: 0,
              left: 0,
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Box m="20px" sx={{ overflowX: "scroll" }}>
        <Box m="10px 0 0 0" height="75vh" width="100%">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            rows={stock.map((productsLot) => ({
              ...productsLot,
              _id: productsLot.name,
              actualStock: `${formatQuantity(productsLot.actualStock)}`,
              quantityBuy: `${formatQuantity(productsLot.quantityBuy)}`,
            }))}
            columns={columns}
            getRowId={(row) => row._id}
            sx={{
              "& .MuiDataGrid-cellContent": {
                color: `${darkMode ? "#fff" : "#222"} `,
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "rgba(0, 100, 255, 0.1)",
              },
              "& .MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor: "rgba(0, 100, 255, 0.2)",
              },
              "& .super-app-theme--header": {
                color: `${darkMode ? "#fff" : "#222"} `,
              },
              "& .MuiTablePagination-root": {
                color: `${darkMode ? "#fff" : "#222"} `,
              },
              "& .MuiButtonBase-root": {
                color: `${darkMode ? "#fff" : "#222"} `,
              },
              "& .MuiDataGrid-selectedRowCount": {
                color: `${darkMode ? "#fff" : "#222"} `,
              },
            }}
            componentsProps={{
              basePopper: {
                sx: {
                  "& .MuiPaper-root": {
                    backgroundColor: `${darkMode && colors.background.default}`,
                  },
                },
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default TableListTotalStock;
