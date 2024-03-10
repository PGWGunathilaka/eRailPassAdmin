import { PendingApprovalUser } from "./PendingApproval";
import { User, UserType } from "./User";

export interface StationMaster extends User, PendingApprovalUser {
    assignedStation : string
    userType: UserType.STATION_MASTER
    updatedAt: Date
 };
