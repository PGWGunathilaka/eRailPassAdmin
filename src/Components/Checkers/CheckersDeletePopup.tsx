import { Typography } from "@mui/material";
import React from "react";
import { Checker } from "../../models/Checker";
import DeletePopupWindow from "../DeletePopupWindow";
import { UserService } from "../../Services/UserService";
import { infoPopup } from "../../util/popups";

export const CheckersDeletePopup: React.FC<{ deletingChecker: Checker | null, onComplete: (isDeleted: boolean) => void }> = ({ deletingChecker, onComplete }) => {

    const handleDeleteCheckerComplete = async (isDeleted: boolean) => {
        if (isDeleted) {
            const res = await UserService.deleteChecker(deletingChecker!._id)
            if (res.success && res.data === true) {
                infoPopup("Checker Deleted");
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
                open={!!deletingChecker}
                onComplete={(isDelete) => handleDeleteCheckerComplete(isDelete)}
                title='Delete Checker'>
                <Typography gutterBottom>
                    Are you sure you want to delete <b>{`${deletingChecker?.firstName} ${deletingChecker?.lastName}`}</b>?
                </Typography>
            </DeletePopupWindow>
        </>
    )
}
