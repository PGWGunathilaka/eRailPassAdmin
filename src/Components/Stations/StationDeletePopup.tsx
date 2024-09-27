import React from "react";
import { Typography } from "@mui/material";
import DeletePopupWindow from "../DeletePopupWindow";
import { Station } from "../../models/Station";
import { UserService } from "../../Services/UserService";
import { infoPopup } from "../../util/popups";
import { StationService } from "../../Services/StationService";

export const StationDeletePopup: React.FC<{ deletingStation: Station|null, onComplete: (isDeleted: boolean) => void }> = ({ deletingStation, onComplete }) => {
    
    const handleDeleteStationComplete = async (isDeleted: boolean) => {
        if (isDeleted) {
            const res = await StationService.deleteOne(deletingStation!._id)
            if (res.success && res.data === true) {
                infoPopup("Station Deleted");
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
        <DeletePopupWindow open={!!deletingStation} onComplete={(isDelete)=>handleDeleteStationComplete(isDelete) } title='Delete Station'>

        <Typography gutterBottom>
                        Are you sure you want to delete <b>{deletingStation?.sName}</b> station? 
                    </Typography>
        </DeletePopupWindow>
        </>
    )
}
