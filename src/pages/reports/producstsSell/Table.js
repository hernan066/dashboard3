/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Avatar, Box } from "@mui/material";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import colors from "assets/theme-dark/base/colors";
import { useMaterialUIController } from "context";

function TableReportProductsByDay({ reports }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [pageSize, setPageSize] = useState(50);

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
      field: "date",
      headerName: "Fecha",
      flex: 1,
      cellClassName: "name-column--cell",
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
      field: "count",
      headerName: "Cantidad vendida",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <Box m="20px">
      <Box height="75vh">
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          rows={reports.map((report) => ({
            ...report,
          }))}
          columns={columns}
          getRowId={(row) => row.name}
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

export default TableReportProductsByDay;
