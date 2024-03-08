import { Typography } from "@mui/material";
import React from "react";
import { Checker } from "../../models/Checker";
import DeletePopupWindow from "../DeletePopupWindow";

export const CheckersDeletePopup: React.FC<{ deletingChecker: Checker|null, onClose: () => void }> = ({ deletingChecker, onClose }) => {
    return (
        <>
        <DeletePopupWindow open={!!deletingChecker} onClose={onClose} title='Delete Checker'>

        <Typography gutterBottom>
                        Are you sure you want to delete <b>{`${deletingChecker?.firstName} ${deletingChecker?.lastName}`}</b>? 
                    </Typography>
        </DeletePopupWindow>
        </>
    )
}
