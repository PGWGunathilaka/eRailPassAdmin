import { PendingApprovalUser } from "./PendingApproval";
import { User, UserType } from "./User";

export interface Checker extends User, PendingApprovalUser {
    userType: UserType.CHECKER
    createdAt: Date
    updatedAt: Date
};
