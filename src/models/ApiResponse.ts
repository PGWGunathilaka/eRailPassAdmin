import { AxiosResponse } from "axios";

export interface ApiResponse<T> extends AxiosResponse<T> {
    success: boolean
    data: T
    message: string
}
