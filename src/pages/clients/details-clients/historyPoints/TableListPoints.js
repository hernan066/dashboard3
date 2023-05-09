/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import colors from "assets/theme-dark/base/colors";
import { useMaterialUIController } from "context";
import { dateToLocalDate } from "utils/dateFormat";

function TableListPoints({ points }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const columns = [
    {
      field: "createdAt",
      headerName: "Creada",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "action",
      headerName: "Accion",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        if (params.row.action === "buy") {
          return (
            <div
              style={{
                height: "30px",
                width: "100px",
                borderRadius: "10px",
                backgroundColor: "green",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0 0 2px #555",
              }}
            >
              Compra
            </div>
          );
        }
        if (params.row.action === "recommendation") {
          return (
            <div
              style={{
                height: "30px",
                width: "100px",
                borderRadius: "10px",
                backgroundColor: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              Recomendación
            </div>
          );
        }
        if (params.row.action === "exchange") {
          return (
            <div
              style={{
                height: "30px",
                width: "100px",
                borderRadius: "10px",
                backgroundColor: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              Canjeo
            </div>
          );
        }
        return (
          <div
            style={{
              height: "30px",
              width: "100px",
              borderRadius: "10px",
              backgroundColor: "yellow",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
              boxShadow: "0 0 2px #555",
            }}
          >
            {params.row.status}
          </div>
        );
      },
    },

    {
      field: "points",
      headerName: "Puntos",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "orderId",
      headerName: "Orden Id",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <Box>
      <Box m="20px" sx={{ overflowX: "scroll" }}>
        <Box m="40px 0 0 0" height="75vh" width="1500px">
          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            rows={points.map((order) => ({
              ...order,
              createdAt: `${dateToLocalDate(order.createdAt)}hs`,
              orderId: order.orderId || "Puntos no generados por una compra",
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
    </Box>
  );
}

export default TableListPoints;
