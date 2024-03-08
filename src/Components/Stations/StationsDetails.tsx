import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo } from "react";
import { StationService } from '../../Services/StationService';
import { SLine, Station } from "../../models/Station";
import { StationDeletePopup } from './StationDeletePopup';
interface StationDetailsProps {
    sLine: SLine;
}
export const StationsDetails: React.FunctionComponent<StationDetailsProps> = ({ sLine }) => {
    const [deletingStation, setDeletingStation] = React.useState<Station | null>(null);
    const [stations, setStations] = React.useState<Station[]>([]);
    const [lineStations, setLineStations] = React.useState<Station[]>([]);

    useEffect(() => {
        StationService.stations().then(res => setStations(res.data))
    }, [])

    useEffect(() => {
        const ls = (stations || []).filter(s => s.sLine === sLine)
        setLineStations(ls)
    }, [sLine, stations])

    const columns = useMemo<MRT_ColumnDef<Station, any>[]>(
        () => [
            {
                accessorKey: '_id', //access nested data with dot notation
                header: 'Station ID',
                size: 30,
            },
            {
                accessorKey: 'sName', //access nested data with dot notation
                header: 'Station Name',

            }, {
                accessorKey: 'sm._id',
                header: 'Station Master ID',
                size: 30,

            },
            {
                accessorFn: (row) =>  `${row.sm.firstName} ${row.sm.lastName}`, //access nested data with dot notation
                header: 'Station Master Name',
                id: 'firstName',
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: lineStations, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnFilters: false,
        enableEditing: true,
        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActions: ({ row }) => (
            <Box sx={{ display: "flex" }}>
                <IconButton onClick={() => setDeletingStation(row.original)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => console.info('View')}>
                    <PreviewIcon />
                </IconButton>
            </Box>
        ),
    });
    return <div style={{ width: '100%' }}>
        <MaterialReactTable table={table} />
        <Box sx={{ display: "flex" }}>
            <IconButton onClick={() => console.info('Add Station')}>
                <AddBusinessIcon />
            </IconButton>
        </Box>
        <StationDeletePopup deletingStation={deletingStation} onClose={() => setDeletingStation(null)} />
    </div>
}
