export enum UserType {
    STATION_MASTER,
    CHECKER,
    ADMIN
}
export interface User {
    assignedDate : string;
    id : string;
    firstName: string;
    lastName?: string;
    address?: string;
    city?: string;
    userType: UserType;
}