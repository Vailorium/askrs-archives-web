import { HeroDataModel } from '.';
import { BuildModel } from '../build';

export interface HeroInfoModel extends HeroDataModel{
    build: BuildModel;
}