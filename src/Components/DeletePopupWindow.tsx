import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React, { Children, ReactNode } from "react";
import { Station } from '../models/Station';
import WarningIcon from '@mui/icons-material/Warning';
interface DeletePopupWindowProps { 
    open: boolean, 
    onComplete: (isDelete:boolean) => void, 
    children: ReactNode, 
    title: string 
}
    export default function DeletePopupWindow({ open, onComplete, children, title }:DeletePopupWindowProps ) {

    const handleClose = () => {
        onComplete(false);
    };
    const handleDelete = () => {
        onComplete(true);
    }

    return (
        <React.Fragment>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <div style={{ display: 'flex', gap: '5px' }}><WarningIcon color='secondary' style={{ fontSize: 32 }} /> {title}</div>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" variant="contained" autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color="error" variant="contained" autoFocus onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
