import { Checker } from "./Checker";
import { StationMaster } from "./StationMaster";

export enum PendingApprovalStatus {
    PENDING,
    APPROVED,
    DECLINED
}

export interface PendingApprovalUser {
    approvalStatus: PendingApprovalStatus
};

export type PendingApproval = StationMaster | Checker
