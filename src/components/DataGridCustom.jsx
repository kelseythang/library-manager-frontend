import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function DataGridCustom({ height, pageSize, rows, columns, setCheckbox, selectionModel, setSelectionModel }) {
  return (
    <Box mb={2} sx={{ height: height, width: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        checkboxSelection={setCheckbox}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: GridToolbar }}
        componentsProps={{ toolbar: { 
          showQuickFilter: true, quickFilterProps: { debounceMs: 500 },
          printOptions: { disableToolbarButton: true }
          } 
        }}
      />
    </Box>
  )
}

export default DataGridCustom;