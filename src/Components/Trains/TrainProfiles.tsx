import DeleteIcon from '@mui/icons-material/Delete';
import TrainIcon from '@mui/icons-material/Train';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo } from "react";
import { Train, TrainLine, TrainStatus } from '../../models/Train';
import { TrainService } from '../../Services/TrainService';
import { StationDeletePopup } from '../Stations/StationDeletePopup';
import { TrainDeletePopup } from './TrainDeletePopup';


export const TrainProfiles: React.FunctionComponent = () => {// Create a state  
    const [deletingTrain, setDeletingTrain] = React.useState<Train | null>(null);
    const [trains, setTrains] = React.useState<Train[]>([]);

    useEffect(() => {
        TrainService.trains().then(res => setTrains(res.data))
    }, [])

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
                accessorFn: (row) => TrainLine[row.trLine].replace("_"," "),  
                accessorKey: 'trLine', //access nested data with dot notation
                header: 'Line',
                size: 100,
            },
            {
                accessorKey: 'trFrom.sName', //access nested data with dot notation
                header: 'From',
                size: 30,
            },
            {
                accessorKey: 'trTo.sName', //access nested data with dot notation
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
        data: trains||[], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnFilters: false,
        enableEditing: true,
        enableRowActions: true,
        positionActionsColumn: 'last',

        renderRowActions: ({ row }) => (
            <Box sx={{ display: "flex" }}>
                <IconButton onClick={() => setDeletingTrain(row.original)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        ),
    });
    
    const handleDelete = (isDeleted: boolean) => {
        if (isDeleted) {
            const profilesWithoutDeleted = trains.filter(p => p._id !== deletingTrain?._id)
            setTrains(profilesWithoutDeleted)
        }
        setDeletingTrain(null)
    }

    return <div style={{ width: '100%' }}>
        <MaterialReactTable table={table} />
        <Box sx={{ bgcolor: "white", display: "flex" }}>
            <IconButton onClick={() => console.info('Add Station')}>
                <TrainIcon />
            </IconButton>
        </Box>
        <TrainDeletePopup deletingTrain={deletingTrain} onComplete={(isDeleted) => handleDelete(isDeleted)} />
    </div>
    
}
export default TrainProfiles;