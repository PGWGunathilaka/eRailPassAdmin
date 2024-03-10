import axios from "axios";
import { apiAdminUrl } from ".";
import { ApiResponse } from "../models/ApiResponse";
import { Train } from "../models/Train";


export class TrainService {

    public static trains() {
        const endPoint = apiAdminUrl('train/all')
        return axios.get<void, ApiResponse<Train[]>>(endPoint)
    }
    public static deleteOne(trainId:string) {
        const endPoint = apiAdminUrl('train/delete/'+ trainId)
        return axios.get<void, ApiResponse<boolean>>(endPoint)
    }


}
