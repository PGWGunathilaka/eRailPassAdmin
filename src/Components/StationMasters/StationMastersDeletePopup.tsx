import { Typography } from "@mui/material";
import React from "react";
import { StationMaster } from "../../models/StationMaster";
import DeletePopupWindow from "../DeletePopupWindow";

export const StationMastersDeletePopup: React.FC<{ deletingStationMaster: StationMaster|null, onClose: () => void }> = ({ deletingStationMaster, onClose }) => {
    return (
        <>
        <DeletePopupWindow open={!!deletingStationMaster} onClose={onClose} title='Delete Station Master'>

        <Typography gutterBottom>
                        Are you sure you want to delete <b>{`${deletingStationMaster?.firstName} ${deletingStationMaster?.lastName}`}</b>? 
                    </Typography>
        </DeletePopupWindow>
        </>
    )
}
