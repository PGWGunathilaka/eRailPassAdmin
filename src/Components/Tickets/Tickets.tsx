import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import { Ticket, TicketType, TicketZone } from "../../models/Ticket";
export const Tickets: React.FunctionComponent = () => {// Create a state  
    const profiles: Ticket[] = useMemo(() => [{
        tType:TicketType.NORMAL,
        tZone: TicketZone.ZONE_1,
        tClass1: "100.00",
        tClass2: "50.00",
        tClass3: "20.00"
    },
    {
        tType:TicketType.INTERCITY,
        tZone: TicketZone.ZONE_2,
        tClass1: "100.00",
        tClass2: "50.00",
        tClass3: "20.00"
    },{
        tType:TicketType.RETURN,
        tZone: TicketZone.ZONE_3,
        tClass1: "100.00",
        tClass2: "50.00",
        tClass3: "20.00"
    },{
        tType:TicketType.NORMAL,
        tZone: TicketZone.ZONE_4,
        tClass1: "100.00",
        tClass2: "50.00",
        tClass3: "20.00"
    },{
        tType:TicketType.BOOKING,
        tZone: TicketZone.ZONE_5,
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