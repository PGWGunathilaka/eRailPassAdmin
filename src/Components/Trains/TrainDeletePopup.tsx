import React from "react";
import { Typography } from "@mui/material";
import DeletePopupWindow from "../DeletePopupWindow";
import { Station } from "../../models/Station";
import { UserService } from "../../Services/UserService";
import { infoPopup } from "../../util/InfoPopup";
import { StationService } from "../../Services/StationService";
import { Train } from "../../models/Train";
import { TrainService } from "../../Services/TrainService";

export const TrainDeletePopup: React.FC<{ deletingTrain: Train|null, onComplete: (isDeleted: boolean) => void }> = ({ deletingTrain, onComplete }) => {
    
    const handleDeleteTrainComplete = async (isDeleted: boolean) => {
        if (isDeleted) {
            const res = await TrainService.deleteOne(deletingTrain!._id)
            if (res.success && res.data === true) {
                infoPopup("Train Removed");
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
        <DeletePopupWindow open={!!deletingTrain} onComplete={(isDelete)=>handleDeleteTrainComplete(isDelete) } title='Delete Train'>
        <Typography gutterBottom>
                        Are you sure you want to delete <b>{deletingTrain?.trName}</b> station? 
                    </Typography>
        </DeletePopupWindow>
        </>
    )
}
