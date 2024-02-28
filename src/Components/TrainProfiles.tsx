import PreviewIcon from '@mui/icons-material/Preview';
import TrainIcon from '@mui/icons-material/Train';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import { Train, TrainLine, TrainStatus } from '../models/Train';
export const TrainProfiles: React.FunctionComponent = () => {// Create a state  
    const profiles: Train[] = useMemo(() => [{
        trNo: 1015,
        trName: "Udarata Manike",
        trLine: TrainLine.MATALE_LINE,
        trFrom: "Colombo Fort",
        trTo: "Badulla",
        trStatus: TrainStatus.RUNNING
    },

    ], [])


    const columns = useMemo<MRT_ColumnDef<Train, any>[]>(
        () => [
            {
                accessorKey: 'trNo', //access nested data with dot notation
                header: 'Train No',
                size: 5,
            },
            {
                accessorKey: 'trName', //access nested data with dot notation
                header: 'Train Name',
                size: 30,
            },
            {
                accessorKey: 'trLine', //access nested data with dot notation
                header: 'Line',
                size: 30,
            },
            {
                accessorKey: 'trFrom', //access nested data with dot notation
                header: 'From',
                size: 30,
            },
            {
                accessorKey: 'trTo', //access nested data with dot notation
                header: 'To',
                size: 30,
            },
            {
                accessorKey: 'trStatus', //access nested data with dot notation
                header: 'Train Status',
                size: 30,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: profiles, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnFilters: false,
        enableEditing: true,
        enableRowActions: true,
        positionActionsColumn: 'last',

        renderRowActions: ({ row }) => (
            <Box sx={{ display: "flex" }}>
                <IconButton onClick={() => console.info('View')}>
                    <PreviewIcon />
                </IconButton>
            </Box>
        ),
    });
    return <div style={{ width: '100%' }}>
        <MaterialReactTable table={table} />
        <Box sx={{ bgcolor: "white", display: "flex" }}>
            <IconButton onClick={() => console.info('Add Station')}>
                <TrainIcon />
            </IconButton>
        </Box>
    </div>
}
export default TrainProfiles;