import { Injectable } from '@angular/core';
import { HeroInfoModel } from '../models';

@Injectable({
    providedIn: 'root'
})
export class PortraitService {
    constructor(){}

    public getIcon(hero: HeroInfoModel): string{
        let st = "assets/units/" + hero.image;
        if(hero.build.resplendent === true){
            st += "_resplendent";
        }
        st += ".png";
        return st;
    }

    public getBtlDefault(hero: HeroInfoModel): string{
        let st = "assets/units_btl/" + hero.image;
        if(hero.build.resplendent === true){
            st += "_resplendent";
        }
        st += ".png";
        return st;
    }
}