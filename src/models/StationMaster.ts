import { PendingApprovalUser } from "./PendingApproval";
import { User, UserType } from "./UserType";

export interface StationMaster extends User, PendingApprovalUser {
    assignedStation : string
    userType: UserType.STATION_MASTER
    updatedAt: Date
 };
