import { ARHeroInfoModel, ARTile, HeroInfoModel } from "..";

//TODO: Deprecated
export interface ARSaveDataModel {
    map: string;
    mapData: ARTile[];
    unitData: ARHeroInfoModel[];
    season: number;
    timestamp?: string;
}