import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import { Ticket, tType, tZone } from "../../Types/Ticket";
export const Tickets: React.FunctionComponent = () => {// Create a state  
    const profiles: Ticket[] = useMemo(() => [{
        tType:tType.NORMAL,
        tZone: tZone.ZONE_1,
        tClass1: "100.00",
        tClass2: "50.00",
        tClass3: "20.00"
    },
    {
        tType:tType.INTERCITY,
        tZone: tZone.ZONE_2,
        tClass1: "100.00",
        tClass2: "50.00",
        tClass3: "20.00"
    },{
        tType:tType.RETURN,
        tZone: tZone.ZONE_3,
        tClass1: "100.00",
        tClass2: "50.00",
        tClass3: "20.00"
    },{
        tType:tType.NORMAL,
        tZone: tZone.ZONE_4,
        tClass1: "100.00",
        tClass2: "50.00",
        tClass3: "20.00"
    },{
        tType:tType.BOOKING,
        tZone: tZone.ZONE_5,
        tClass1: "100.00",
        tClass2: "50.00",
        tClass3: "20.00"
    },
    ], [])


    const columns = useMemo<MRT_ColumnDef<Ticket, any>[]>(
        () => [
            {
                accessorKey: 'tZone', //access nested data with dot notation
                header: 'Distance zones (km) ',
                size: 50,
                align :'center'
            },
            {
                accessorKey: 'tClass1', //access nested data with dot notation
                header: '1st Class',
                size: 30,
            },
            {
                accessorKey: 'tClass2', //access nested data with dot notation
                header: '2nd Class',
                size: 30,
            },
            {
                accessorKey: 'tClass3', //access nested data with dot notation
                header: '3rd Class',
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
                <IconButton onClick={() => console.info('Edit')}>
                    <EditIcon />
                </IconButton>
                            </Box>
        ),
    });
    return <div style={{ width: '100%' }}>
        <MaterialReactTable table={table} />
        <Box sx={{ display: "flex"}}>
            <IconButton onClick={() => console.info('Add Station')}>
                <LocalOfferIcon />
            </IconButton>
        </Box>
    </div>
}
export default Tickets;