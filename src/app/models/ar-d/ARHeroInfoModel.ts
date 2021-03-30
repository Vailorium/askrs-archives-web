import { ARBuildModel } from ".";
import { HeroDataModel } from "..";

export interface ARHeroInfoModel extends HeroDataModel{
    build: ARBuildModel;
    uid: string;
}