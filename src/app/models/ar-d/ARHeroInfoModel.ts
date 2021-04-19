import { BuildModel } from "..";
import { HeroDataModel } from "..";

export interface ARHeroInfoModel extends HeroDataModel{
    build: BuildModel;
    uid: string;
}