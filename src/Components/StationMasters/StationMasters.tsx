import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import React, { useMemo } from "react";
import { StationMaster } from "../../models/StationMaster";
import { UserType } from '../../models/UserType';
import { StationDeletePopup } from '../Stations/StationDeletePopup';
import { StationMastersDeletePopup } from './StationMastersDeletePopup';
export const StationMasters: React.FunctionComponent = () => {// Create a state  
    const [deletingStationMaster, setdeletingStationMaster] = React.useState<StationMaster | null>(null);
    const profiles: StationMaster[] = useMemo(() => [{
        assignedDate: "2021-05-07",
        id: "009",
        firstName: "Prasadini",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    },
    {
        assignedDate: "2021-05-07",
        id: "005",
        firstName: "Geethadhari",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "006",
        firstName: "Ruwan",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "007",
        firstName: "Prasad",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "008",
        firstName: "Jayasinghe",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "009",
        firstName: "Prasadini",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    },
    {
        assignedDate: "2021-05-07",
        id: "005",
        firstName: "Geethadhari",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "006",
        firstName: "Ruwan",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "007",
        firstName: "Prasad",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "008",
        firstName: "Jayasinghe",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "009",
        firstName: "Prasadini",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    },
    {
        assignedDate: "2021-05-07",
        id: "005",
        firstName: "Geethadhari",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "006",
        firstName: "Ruwan",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "007",
        firstName: "Prasad",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    }, {
        assignedDate: "2021-05-07",
        id: "008",
        firstName: "Jayasinghe",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER
    },
    ], [])

    const columns = useMemo<MRT_ColumnDef<StationMaster, any>[]>(
        () => [
            {
                accessorKey: 'id', //access nested data with dot notation
                header: 'ID',
                size: 80,
            },
            {
                accessorKey: 'assignedDate', //access nested data with dot notation
                header: 'Assigned Date',

            },
            {
                accessorKey: 'firstName', //access nested data with dot notation
                header: 'Station Master Name',

            },
            {
                accessorKey: 'assignedStation',
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
                <IconButton onClick={() => setdeletingStationMaster(row.original)}>
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
        <StationMastersDeletePopup deletingStationMaster={deletingStationMaster} onClose={() => setdeletingStationMaster(null)} />
    </div>
}