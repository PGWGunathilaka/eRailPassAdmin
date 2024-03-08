import axios from "axios";
import { ApiResponse } from "../models/ApiResponse";
import { apiPublicUrl } from ".";
import { Station } from "../models/Station";


export class StationService {
    
    public static stations() {
        const endPoint = apiPublicUrl('station/all')
        return axios.get<void, ApiResponse<Station[]>>(endPoint)
    }
}
