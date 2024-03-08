import { PendingApprovalUser } from "./PendingApproval";
import { User, UserType } from "./UserType";

export interface Checker extends User, PendingApprovalUser {
    userType: UserType.CHECKER
    createdAt: Date
    updatedAt: Date
};
