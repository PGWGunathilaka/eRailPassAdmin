import { User, UserType } from "./UserType";

export enum PendingApprovalStatus {
    PENDING,
    APPROVED,
    DECLINED
}
export interface PendingApproval extends User {
       userType: UserType.STATION_MASTER | UserType.CHECKER
       status:PendingApprovalStatus
   };
