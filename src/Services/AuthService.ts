import axios from "axios";
import { ApiResponse } from "../models/ApiResponse";
import { apiPublicUrl } from ".";


export class AuthService {
    
    public static login() {
        const endPoint = apiPublicUrl('login')
        return axios.get<void, ApiResponse<string>>(endPoint)
    }
}
