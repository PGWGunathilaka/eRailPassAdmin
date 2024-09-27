import axios from "axios";
import { ApiResponse } from "../models/ApiResponse";
import { apiAdminUrl, apiPublicUrl } from ".";


export class AuthService {
    
    public static login(email:string, password:string) {
        const endPoint = apiPublicUrl('login')
        return axios.post<void, ApiResponse<string>>(endPoint, {email,password})
    }
    public static saveToken = (token:string)=> {
        localStorage.setItem('token',token)
    }
    public static getToken() : string|null {
        return localStorage.getItem('token')
    }
}
