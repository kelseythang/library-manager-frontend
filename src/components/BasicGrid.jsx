import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function BasicGrid({ height, pageSize, rows, columns, selectionModel, setSelectionModel }) {
  return (
    <Box mb={2} sx={{ height: height, width: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        pagination
      />
    </Box>
  )
}

export default BasicGrid