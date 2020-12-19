import { ARTile, HeroInfoModel } from ".";

export interface SaveDataModel {
    map: string;
    mapData: ARTile[];
    unitData: HeroInfoModel[];
    season: number;
    timestamp?: string;
}