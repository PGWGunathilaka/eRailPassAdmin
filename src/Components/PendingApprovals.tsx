import { Box, IconButton, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { PendingApproval, PendingApprovalStatus } from "../models/PendingApproval";
import { UserType } from "../models/UserType";
export const PendingApprovals: React.FunctionComponent = () => {// Create a state  

    const profiles: PendingApproval[] = useMemo(() => [{
        assignedDate: "2021-05-07",
        id: "009",
        firstName: "Prasadini",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER,
        status: PendingApprovalStatus.PENDING
    },
    {
        assignedDate: "2021-05-07",
        id: "005",
        firstName: "Geethadhari",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER,
        status: PendingApprovalStatus.DECLINED
    }, {
        assignedDate: "2021-05-07",
        id: "006",
        firstName: "Ruwan",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER,
        status: PendingApprovalStatus.PENDING
    }, {
        assignedDate: "2021-05-07",
        id: "007",
        firstName: "Prasad",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER,
        status: PendingApprovalStatus.PENDING
    }, {
        assignedDate: "2021-05-07",
        id: "008",
        firstName: "Jayasinghe",
        assignedStation: "Nugegoda",
        userType: UserType.STATION_MASTER,
        status: PendingApprovalStatus.DECLINED
    }, {
        assignedDate: "2021-05-07",
        id: "009",
        firstName: "Prasadini",
        assignedStation: "Nugegoda",
        userType: UserType.CHECKER,
        status: PendingApprovalStatus.PENDING
    },

    ], []);

    const sortedApprovals = useMemo(() => {
        const declinedApprovals = profiles.filter(profile => profile.status === PendingApprovalStatus.DECLINED);
        const pendingApprovals = profiles.filter(profile => profile.status !== PendingApprovalStatus.DECLINED);
        return [...pendingApprovals, ...declinedApprovals];
    }, []);


    const columns = useMemo<MRT_ColumnDef<PendingApproval, any>[]>(
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
                header: 'Name',
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: sortedApprovals, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnFilters: false,
        enableRowActions: true,
        positionActionsColumn: 'last',
                
        renderRowActions: ({ row }) => (
            <Box sx={{ display: "flex", justifyContent: 'center' }} >
                {row.original.status === PendingApprovalStatus.PENDING && (
                    <IconButton onClick={() => console.info('Edit')}>
                        <CheckIcon />
                    </IconButton>
                )}
                {row.original.status === PendingApprovalStatus.PENDING && (
                    <IconButton onClick={() => console.info('Delete')}>
                        <CloseIcon />
                    </IconButton>
                )}
                {row.original.status === PendingApprovalStatus.DECLINED && (
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