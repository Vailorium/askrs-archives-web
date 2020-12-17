import { HeroDataModel } from '.';
import { BuildModel } from './BuildModel';

export interface HeroInfoModel extends HeroDataModel{
    build: BuildModel;
    uid: string;
}