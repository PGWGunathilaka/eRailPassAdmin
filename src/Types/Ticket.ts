export enum tZone {
    ZONE_1 = "0 - 10",
    ZONE_2 = "10 - 50",
    ZONE_3 = "50 - 100",
    ZONE_4 = "100 - 200",
    ZONE_5 = "200 -"
}
export enum tType {
    NORMAL,
    RETURN,
    BOOKING,
    INTERCITY,
    SEASON,
}
export interface Ticket {
    tType: tType;
    tClass1: string;
    tClass2: string;
    tClass3: string;
    tZone: tZone;
}
