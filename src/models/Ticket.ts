export enum TicketZone {
    ZONE_1 = "0 - 10",
    ZONE_2 = "10 - 50",
    ZONE_3 = "50 - 100",
    ZONE_4 = "100 - 200",
    ZONE_5 = "200 -"
}
export enum TicketType {
    NORMAL,
    RETURN,
    BOOKING,
    INTERCITY,
    SEASON,
}
export enum SeasonType {
    PRIVATE,
    GOVT,
    SCHOOL,
}

export interface Ticket {
    tType: TicketType;
    tClass1: string;
    tClass2: string;
    tClass3: string;
    tZone: TicketZone;
    seasonType?:SeasonType;
}
