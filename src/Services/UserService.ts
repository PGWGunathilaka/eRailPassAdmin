import axios, { AxiosRequestConfig } from "axios";
import { apiAdminUrl } from ".";
import { ApiResponse } from "../models/ApiResponse";
import { Checker } from "../models/Checker";
import { StationMaster } from "../models/StationMaster";
import { PendingApproval, PendingApprovalStatus } from "../models/PendingApproval";
import { StatData } from "../Components/Reports/PassengerRegistration";

export type TicketCheckedStatsType = {_id: {ymd:string, checker:{firstName:string, lastName:string}}, count: number, isFined:number,fineTotal:number }

export class UserService {
    
    public static checkers() {
        const endPoint = apiAdminUrl('user/checkers')
        return axios.get<void, ApiResponse<Checker[]>>(endPoint)
    }

    public static deleteChecker(checkerId:string) {
        const endPoint = apiAdminUrl('user/delete-checker/'+ checkerId)
        return axios.get<void, ApiResponse<boolean>>(endPoint)
    }

    public static stationMasters() {
        const endPoint = apiAdminUrl('user/station-masters')
        return axios.get<void, ApiResponse<StationMaster[]>>(endPoint)
    }

    public static deleteStationMaster(stationMasterId:string) {
        const endPoint = apiAdminUrl('user/delete-station-master/'+ stationMasterId)
        return axios.get<void, ApiResponse<boolean>>(endPoint)
    }

    public static pendingApprovals() {
        const endPoint = apiAdminUrl('pending-approval/all')
        return axios.get<void, ApiResponse<(StationMaster | Checker)[]>>(endPoint)
    }

    public static updateApprovalStatus(pendingApprovalId: string, newStatus: PendingApprovalStatus) {
        const endPoint = apiAdminUrl('pending-approval/update')
        return axios.post<void, ApiResponse<PendingApproval>>(endPoint, { _id: pendingApprovalId, status:  newStatus })
    }

    public static passengerStats() {
        const endPoint = apiAdminUrl('user/passenger-stats')
        return axios.get<void, ApiResponse<{_id: string, count: number}[]>>(endPoint)
    }

    public static ticketCheckedStats() {
        const endPoint = apiAdminUrl('user/ticket-checked-stats')
        return axios.get<void, ApiResponse<TicketCheckedStatsType[]>>(endPoint)
    }
   
}
