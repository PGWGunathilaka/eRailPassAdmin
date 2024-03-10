export enum UserType {
    ADMIN,
    STATION_MASTER,
    CHECKER,
    PASSENGER,
}
export interface User {
    assignedDate : string;
    _id : string;
    firstName: string;
    lastName?: string;
    address?: string;
    city?: string;
    role: UserType;
}