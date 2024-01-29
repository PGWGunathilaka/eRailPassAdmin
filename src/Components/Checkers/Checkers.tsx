import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import React, { useMemo } from "react";
import { Checker } from "../../Types/Checker";
import { UserType } from '../../Types/UserType';
import { CheckersDeletePopup } from './CheckersDeletePopup';
export const Checkers: React.FunctionComponent = () => {
    const [deletingChecker, setDeletingChecker] = React.useState<Checker | null>(null);
    const profiles: Checker[] = useMemo(() => [{
        assignedDate: "2021-05-07",
        id: "009",
        firstName: "Prasadini",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    },
    {
        assignedDate: "2021-05-07",
        id: "005",
        firstName: "Geethadhari",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "006",
        firstName: "Ruwan",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "007",
        firstName: "Prasad",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "008",
        firstName: "Jayasinghe",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "009",
        firstName: "Prasadini",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER,
    },
    {
        assignedDate: "2021-05-07",
        id: "005",
        firstName: "Geethadhari",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "006",
        firstName: "Ruwan",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "007",
        firstName: "Prasad",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "008",
        firstName: "Jayasinghe",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "009",
        firstName: "Prasadini",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    },
    {
        assignedDate: "2021-05-07",
        id: "005",
        firstName: "Geethadhari",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "006",
        firstName: "Ruwan",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "007",
        firstName: "Prasad",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    }, {
        assignedDate: "2021-05-07",
        id: "008",
        firstName: "Jayasinghe",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER
    },
    ], [])

    const columns = useMemo<MRT_ColumnDef<Checker, any>[]>(
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
                header: 'Checker Name',

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
                <IconButton onClick={() => setDeletingChecker(row.original)}>
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
        <CheckersDeletePopup deletingChecker={deletingChecker} onClose={() => setDeletingChecker(null)} />
    </div>
}