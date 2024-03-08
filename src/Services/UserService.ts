import axios from "axios";
import { apiAdminUrl } from ".";
import { ApiResponse } from "../models/ApiResponse";
import { Checker } from "../models/Checker";
import { StationMaster } from "../models/StationMaster";


export class UserService {
    
    public static checkers() {
        const endPoint = apiAdminUrl('user/checkers')
        return axios.get<void, ApiResponse<Checker[]>>(endPoint)
    }

    public static stationMasters() {
        const endPoint = apiAdminUrl('user/station-masters')
        return axios.get<void, ApiResponse<StationMaster[]>>(endPoint)
    }

    public static pendingApprovals() {
        const endPoint = apiAdminUrl('pending-approval/all')
        return axios.get<void, ApiResponse<(StationMaster | Checker)[]>>(endPoint)
    }
}
