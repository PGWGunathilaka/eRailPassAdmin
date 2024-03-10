import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, IconButton } from "@mui/material";
import dayjs from 'dayjs';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo } from "react";
import { UserService } from '../../Services/UserService';
import { Checker } from "../../models/Checker";
import { CheckersDeletePopup } from './CheckersDeletePopup';
export const Checkers: React.FunctionComponent = () => {
    const [deletingChecker, setDeletingChecker] = React.useState<Checker | null>(null);
    const [profiles, setProfiles] = React.useState<Checker[]>([]);

    useEffect(() => {
        UserService.checkers().then(res => setProfiles(res.data))
    }, [])

    const columns = useMemo<MRT_ColumnDef<Checker, any>[]>(
        () => [
            {
                accessorKey: '_id', //access nested data with dot notation
                header: 'ID',
                size: 80,
            },
            {
                accessorFn: (row) => dayjs(row.updatedAt).format("YYYY-MM-DD"), //access nested data with dot notation
                header: 'Assigned Date',
                id: 'updatedAt',

            },
            {
                accessorFn: (row) => `${row.firstName} ${row.lastName}`, //access nested data with dot notation
                header: 'Checker Name',
                id: 'firstName',
            },
        ],
        [],
    );
    const table = useMaterialReactTable({
        enableStickyHeader:true,
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
            </Box>
        ),
    });
    const handleDelete = (isDeleted: boolean) => {
        if (isDeleted) {
            const profilesWithoutDeleted = profiles.filter(p => p._id !== deletingChecker?._id)
            setProfiles(profilesWithoutDeleted)
        }
        setDeletingChecker(null)
    }

    return <div style={{ width: '100%' }}>
        <MaterialReactTable table={table} />
        <CheckersDeletePopup deletingChecker={deletingChecker} onComplete={(isDeleted) => handleDelete(isDeleted)} />
    </div>
}