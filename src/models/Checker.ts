import { User, UserType } from "./UserType";

export interface Checker extends User {
    userType: UserType.CHECKER
};
