import axios from "axios";
import { ApiResponse } from "../models/ApiResponse";
import { apiAdminUrl, apiPublicUrl } from ".";
import { Station } from "../models/Station";

export interface PassengerTicketStatsType {
    _id: {date:string,station:{sName:string} }, 
    ticketCounts: [
        {
            type:number,
            count:number
        }
    ]
    }

export class StationService {
    
    public static stations() {
        const endPoint = apiPublicUrl('station/all')
        return axios.get<void, ApiResponse<Station[]>>(endPoint)
    }
    public static deleteOne(stationId:string) {
        const endPoint = apiAdminUrl('station/delete/'+ stationId)
        return axios.get<void, ApiResponse<boolean>>(endPoint)
    }
    public static passengerTicketStats() {
        const endPoint = apiAdminUrl('station/passenger-tickets-stats')
        return axios.get<void, ApiResponse<PassengerTicketStatsType[]>>(endPoint)
    }
}
