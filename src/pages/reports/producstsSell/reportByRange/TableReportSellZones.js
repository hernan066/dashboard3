/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Box } from "@mui/material";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import colors from "assets/theme-dark/base/colors";
import { useMaterialUIController } from "context";
import { formatPrice } from "utils/formaPrice";
import { formatQuantity } from "utils/quantityFormat";

function TableReportSellZones({ sellZones, totalProfits }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [pageSize, setPageSize] = useState(50);

  const columns = [
    {
      field: "zone",
      headerName: "Zona",
      flex: 1.5,
      cellClassName: "name-column--cell",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "total",
      headerName: "Cantidad facturada",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalCost",
      headerName: "Costo total",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "totalProfits",
      headerName: "Ganancia $",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "profitPercentage",
      headerName: "Ganancia %",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "profitTotalPercentage",
      headerName: "% Total Ganancia",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <Box m="20px">
      <Box height="auto">
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          rows={sellZones.map((report) => ({
            ...report,

            total: formatPrice(report.totalSell),
            totalProfits: formatPrice(report.totalProfits),
            totalCost: formatPrice(report.totalCost),
            profitPercentage: `${formatQuantity((report.totalProfits * 100) / report.totalCost)}%`,
            profitTotalPercentage: `${formatQuantity((report.totalProfits * 100) / totalProfits)}%`,
          }))}
          columns={columns}
          getRowId={(row) => row.zone}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 100, 200]}
          pagination
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
  );
}

export default TableReportSellZones;
