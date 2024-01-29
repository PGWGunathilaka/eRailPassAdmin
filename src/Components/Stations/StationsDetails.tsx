import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import React, { useMemo } from "react";
import { SLine, Station } from "../../Types/Station";
import DeletePopupWindow from '../DeletePopupWindow';
import { StationDeletePopup } from './StationDeletePopup';
interface StationDetailsProps {
    sLine: SLine;
}
export const StationsDetails: React.FunctionComponent <StationDetailsProps>= ({sLine}) => {
    const [deletingStation, setDeletingStation] = React.useState<Station|null>(null);
    const stations: Station[] = useMemo(() => [{
        sId: "s005",
        sName: "Panadura",
        sLine: SLine.TRINCOMALEE_LINE,
        smId: "sm003",
        stationMasterName: "PRASA"
    },
    {
        sId: "s007",
        sName: "pinwatta",
        sLine: SLine.TALAIMANNAR_LINE,
        smId: "sm043",
        stationMasterName: "PRASA"
    },
    {
        sId: "s010",
        sName: "moratuwa",
        sLine: SLine.NORTHER_LINE,
        smId: "sm008",
        stationMasterName: "PRASA"
    },
    {
        sId: "s025",
        sName: "meerigama",
        sLine: SLine.PUTTALAM_LINE,
        smId: "sm006",
        stationMasterName: "PRASA"
    },
    {
        sId: "s032",
        sName: "wadduwa",
        sLine: SLine.COAST_LINE,
        smId: "sm083",
        stationMasterName: "PRASA"
    },
    {
        sId: "s060",
        sName: "weyangoda",
        sLine: SLine.KV_LINE,
        smId: "sm043",
        stationMasterName: "PRASA"
    },
    ], [])
    const filteredData = useMemo(()=>{
        return stations.filter((station)=>
     station.sLine ===sLine);
    }, [sLine])
    
    const columns = useMemo<MRT_ColumnDef<Station, any>[]>(
        () => [
            {
                accessorKey: 'sId', //access nested data with dot notation
                header: 'Station ID',
                size: 30,
            },
            {
                accessorKey: 'sName', //access nested data with dot notation
                header: 'Station Name',

            }, {
                accessorKey: 'smId',
                header: 'Station Master ID',
                size: 30,

            },
            {
                accessorKey: 'stationMasterName',
                header: 'Station Master Name',

            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: filteredData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
        <StationDeletePopup deletingStation={deletingStation} onClose={()=>setDeletingStation(null)} />
    </div>
}