import { Typography } from "@mui/material";
import React from "react";
import { StationMaster } from "../../models/StationMaster";
import DeletePopupWindow from "../DeletePopupWindow";
import { UserService } from "../../Services/UserService";
import { infoPopup } from "../../util/InfoPopup";

interface StationMastersDeletePopupProps {
    deletingStationMaster: StationMaster | null,
    onComplete: (isDeleted: boolean) => void
}

export const StationMastersDeletePopup: React.FC<StationMastersDeletePopupProps> = ({ deletingStationMaster, onComplete }) => {
    const handleDeleteStationMasterComplete = async (isDeleted: boolean) => {
        if (isDeleted) {
            const res = await UserService.deleteStationMaster(deletingStationMaster!._id)
            if (res.success && res.data === true) {
                infoPopup("Station Master Deleted");
                onComplete(true)
            } else {
                //TODO failed popup
                onComplete(false)
            }
        } else {
            onComplete(false)
        }
    }

    return (
        <>
            <DeletePopupWindow
                open={!!deletingStationMaster}
                onComplete={(isDelete) => handleDeleteStationMasterComplete(isDelete)}
                title='Delete Station Master' >
                <Typography gutterBottom>
                    Are you sure you want to delete <b>{`${deletingStationMaster?.firstName} ${deletingStationMaster?.lastName}`}</b>?
                </Typography>
            </DeletePopupWindow >
        </>
    )
}
