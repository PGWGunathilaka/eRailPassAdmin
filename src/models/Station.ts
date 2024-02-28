import { EnumDeclaration } from "typescript";

export enum SLine {
    MAIN_LINE,
    MATALE_LINE,
    PUTTALAM_LINE,
    NORTHER_LINE,
    BATTICOLOA_LINE,
    COAST_LINE,
    KV_LINE,
    TRINCOMALEE_LINE,
    TALAIMANNAR_LINE,
}
export interface Station {
    sId:string;
    sName: string;
    sLine:SLine;
    smId: string;
    stationMasterName: string;
}
