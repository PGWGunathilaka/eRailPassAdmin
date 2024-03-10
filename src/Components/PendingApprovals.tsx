import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Box, IconButton } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo } from "react";
import { UserService } from "../Services/UserService";
import { PendingApproval, PendingApprovalStatus } from "../models/PendingApproval";
import dayjs from 'dayjs';
import { UserType } from '../models/User';
export const PendingApprovals: React.FunctionComponent = () => {

    const [profiles, setProfiles] = React.useState<PendingApproval[]>([]);

    useEffect(() => {
        UserService.pendingApprovals().then(res => setProfiles(res.data))
    }, [])

    const fetchPendingApprovals = async () => {
        try {
            const response = await UserService.pendingApprovals();
            setProfiles(response.data);
        } catch (error) {
            console.error("Error fetching pending approvals:", error);
        }
    };

    const handleApproval = async (id: string, newStatus: PendingApprovalStatus) => {
        try {
            await UserService.updateApprovalStatus(id, newStatus);
            // After updating, fetch the updated list of pending approvals
            fetchPendingApprovals();
        } catch (error) {
            console.error("Error updating approval status:", error);
        }
    };

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
                accessorFn: (row) => `${row.firstName} ${row.lastName}`, 
                header: 'Name',
            },
            {
                accessorFn: (row) => UserType[row.role],  
                header: 'Designation',
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
                
                    <IconButton onClick={() => handleApproval(row.original._id, PendingApprovalStatus.APPROVED)}>
                        <CheckIcon />
                    </IconButton>
                
                    <IconButton onClick={() => handleApproval(row.original._id, PendingApprovalStatus.DECLINED)}>
                        <CloseIcon />
                    </IconButton>
            </Box>
        ),
    });
    return <div style={{ width: '100%' }}>
        <MaterialReactTable table={table} />
    </div>
}