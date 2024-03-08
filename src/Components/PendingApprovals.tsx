import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo } from "react";
import { UserService } from "../Services/UserService";
import { PendingApproval, PendingApprovalStatus } from "../models/PendingApproval";
import dayjs from 'dayjs';
export const PendingApprovals: React.FunctionComponent = () => {

    const [profiles, setProfiles] = React.useState<PendingApproval[]>([]);

    useEffect(() => {
        UserService.pendingApprovals().then(res => setProfiles(res.data))
    }, [])


    const columns = useMemo<MRT_ColumnDef<PendingApproval, any>[]>(
        () => [
            {
                accessorKey: '_id', //access nested data with dot notation
                header: 'ID',
                size: 80,
            },
            {
                accessorFn: (row) =>  dayjs(row.updatedAt).format("YYYY-MM-DD"),
                header: 'Created Date',
            },
            {
                accessorKey: 'firstName', //access nested data with dot notation
                header: 'Name',
            },
            {
                accessorFn: (row) => {
                    switch (row.approvalStatus) {
                        case PendingApprovalStatus.PENDING:
                            return "PENDING"
                        case PendingApprovalStatus.APPROVED:
                            return "APPROVED"
                        case PendingApprovalStatus.DECLINED:
                            return "DECLINED"
                    }
                }, //access nested data with dot notation
                id: 'approvalStatus',
                header: 'Status',
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: profiles || [], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnFilters: false,
        enableRowActions: true,
        positionActionsColumn: 'last',

        renderRowActions: ({ row }) => (
            <Box sx={{ display: "flex", justifyContent: 'center' }} >
                {row.original.approvalStatus === PendingApprovalStatus.PENDING && (
                    <IconButton onClick={() => console.info('Edit')}>
                        <CheckIcon />
                    </IconButton>
                )}
                {row.original.approvalStatus === PendingApprovalStatus.PENDING && (
                    <IconButton onClick={() => console.info('Delete')}>
                        <CloseIcon />
                    </IconButton>
                )}
                {row.original.approvalStatus === PendingApprovalStatus.DECLINED && (
                    <IconButton onClick={() => console.info('Delete')}>
                        <SettingsBackupRestoreIcon />
                    </IconButton>
                )}

            </Box>
        ),
    });
    return <div style={{ width: '100%' }}>
        <MaterialReactTable table={table} />
    </div>
}