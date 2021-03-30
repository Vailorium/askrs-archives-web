import { ARTile, HeroInfoModel } from "..";

//TODO: Deprecated
export interface ARSaveDataModel {
    map: string;
    mapData: ARTile[];
    unitData: HeroInfoModel[];
    season: number;
    timestamp?: string;
}