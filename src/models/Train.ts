export enum TrainLine {
    MAIN_LINE = 5,
    MATALE_LINE = 7,
    PUTTALAM_LINE = 10,
    NORTHERN_LINE = 9,
    BATTICOLOA_LINE = 1,
    COASTAL_LINE = 2,
    KV_LINE = 3,
    TRINCOMALEE_LINE = 11,
    TALAIMANNAR_LINE = 6,
}
export enum TrainStatus {
    RUNNING = 'Running',
    MAINTAINING = 'in Maintaining',
    NO_SERVICE = 'out of service'
}
export interface Stop {
    station: string,
    time : Date,
}
export interface Train {
    _id : string;
    trName: string;
    trLine: TrainLine;
    trFrom: string;
    trTo:string;
    trStatus: TrainStatus;
    stops: Stop[]
  }
