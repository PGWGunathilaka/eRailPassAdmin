
export enum SLine {
    MAIN_LINE = 5,
    MATALE_LINE = 7,
    PUTTALAM_LINE = 10,
    NORTHER_LINE = 9,
    BATTICOLOA_LINE = 1,
    COASTAL_LINE = 2,
    KV_LINE = 3,
    TRINCOMALEE_LINE = 11,
    TALAIMANNAR_LINE = 6,
}

export interface Station {
    sId:string;
    sName: string;
    sLine:SLine;
    sm: {id: string, firstName: string, lastName: string};
    stationMasterName: string;
}
