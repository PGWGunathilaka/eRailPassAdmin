import React from "react";
import { Typography } from "@mui/material";
import DeletePopupWindow from "../DeletePopupWindow";
import { Station } from "../../Types/Station";

export const StationDeletePopup: React.FC<{ deletingStation: Station|null, onClose: () => void }> = ({ deletingStation, onClose }) => {
    return (
        <>
        <DeletePopupWindow open={!!deletingStation} onClose={onClose} title='Delete Station'>

        <Typography gutterBottom>
                        Are you sure you want to delete <b>{deletingStation?.sName}</b> station? 
                    </Typography>
        </DeletePopupWindow>
        </>
    )
}
