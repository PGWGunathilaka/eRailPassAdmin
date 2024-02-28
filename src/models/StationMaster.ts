import { User, UserType } from "./UserType";

export interface StationMaster extends User{
    assignedStation : string
    userType: UserType.STATION_MASTER
 };
