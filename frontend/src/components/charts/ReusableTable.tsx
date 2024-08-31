import { Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

import ReusablePopover from "../ReusablePopover";
import { queries } from '../../api';


interface ReusableTableProps {
    table: string;
    columns: {
        name: string
    }[]
};

const ReusableTable = ({ table, columns }: ReusableTableProps) => {
    const tableData = useQuery(queries.query("/" + table));
    // return ({
    //     pending: <></>,
    //     loading: <>Loading...</>,
    //     error: <>Error</>,
    //     success: (
    //         <Box sx={{ height: 400, width: '100%', my: 4 }}>
    //             <Typography variant="h6">{table}</Typography>
    //                 <DataGrid
    //                     rows={tableData?.data.map((item: any, key: number) => ({ id: key, ...item }))}
    //                     columns={columns.map((field: any) => ({
    //                         // ...field,
    //                         field: field.name,
    //                         headerName: field.name,
    //                         width: 150,
    //                         editable: true,
    //                         ...(field.name === "items") && {
    //                             renderCell: (params) => <ReusablePopover params={params} />
    //                         }
    //                     }))}
    //                     // pageSize={5}
    //                     // rowsPerPageOptions={[5]}
    //                     sx={{ height: 400, width: '100%' }}
    //                 />
    //         </Box>
    //     )
    // }[tableData.status]);

    return tableData.isLoading 
        ? <div>Loading...</div> 
        : (tableData?.data && Array.isArray(tableData?.data)) 
            ? (
                <Box sx={{ height: 400, width: '100%', my: 4 }}>
                    <Typography variant="h6">{table}</Typography>
                        <DataGrid
                            rows={tableData?.data.map((item: any, key: number) => ({ id: key, ...item }))}
                            columns={columns.map((field: any) => ({
                                // ...field,
                                field: field.name,
                                headerName: field.name,
                                width: 150,
                                editable: true,
                                ...(field.name === "items") && {
                                    renderCell: (params) => <ReusablePopover params={params} />
                                }
                            }))}
                            // pageSize={5}
                            // rowsPerPageOptions={[5]}
                            sx={{ height: 400, width: '100%' }}
                        />
                </Box>
            ) 
            : null
};

export default ReusableTable;