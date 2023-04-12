import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { useMemo } from 'react';

export default function DataGridDemo({column,row}) {
  const columns = useMemo(() => column, []);
  const rows = useMemo(() => row, []);
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box sx={{ width: '100%', minWidth: 800 }}>
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          pagination
          rows={rows}
          columns={columns}
          autoHeight={true}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}