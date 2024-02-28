export enum TrainLine {
    MAIN_LINE ="Main Line",
    MATALE_LINE = "Matale Line",
    PUTTALAM_LINE ="Puttalam Line",
    NORTHER_LINE = "Norther Line",
    BATTICOLOA_LINE = 'Batticoloa Line',
    COAST_LINE ='Coast Line',
    KV_LINE ='Kv Line',
    TRINCOMALEE_LINE='Trincomalee line',
    TALAIMANNAR_LINE = 'Talaimannar Line',
}
export enum TrainStatus {
    RUNNING = 'Running',
    MAINTAINING = 'in Maintaining',
    NO_SERVICE = 'out of service'
}
export interface Train {
    trNo : number;
    trName: string;
    trLine: TrainLine;
    trFrom: string;
    trTo:string;
    trStatus: TrainStatus;
  }
