import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo } from "react";
import { UserService } from '../../Services/UserService';
import { StationMaster } from "../../models/StationMaster";
import { StationMastersDeletePopup } from './StationMastersDeletePopup';
import dayjs from 'dayjs';
export const StationMasters: React.FunctionComponent = () => {// Create a state  
    const [deletingStationMaster, setDeletingStationMaster] = React.useState<StationMaster | null>(null);
    const [profiles, setProfiles] = React.useState<StationMaster[]>([]);

    useEffect(() => {
        UserService.stationMasters().then(res => setProfiles(res.data))
    }, [])


    const columns = useMemo<MRT_ColumnDef<StationMaster, any>[]>(
        () => [
            {
                accessorKey: '_id', //access nested data with dot notation
                header: 'ID',
                size: 80,
            },
            {
                accessorFn: (row) =>  dayjs(row.updatedAt).format("YYYY-MM-DD"), //access nested data with dot notation
                header: 'Assigned Date',
                id: 'updatedAt',

            },
            {
                accessorFn: (row) =>  `${row.firstName} ${row.lastName}`, //access nested data with dot notation
                header: 'Station Master Name',
                id: 'firstName',
            },
            {
                accessorKey: 'station.sName',
                header: 'Assigned Station',

            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: profiles, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnFilters: false,
        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActions: ({ row }) => (
            <Box sx={{ display: "flex" }}>
                <IconButton onClick={() => setDeletingStationMaster(row.original)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => console.info('Delete')}>
                    <PreviewIcon />
                </IconButton>
            </Box>
        ),
    });
    return <div style={{ width: '100%' }}>
        <MaterialReactTable table={table} />
        <StationMastersDeletePopup deletingStationMaster={deletingStationMaster} onClose={() => setDeletingStationMaster(null)} />
    </div>
}