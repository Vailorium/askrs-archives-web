import { Injectable } from '@angular/core';
import { Blessing, HeroInfoModel, Kind } from '../models';

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

    getBlessing(hero: HeroInfoModel, isLarge: boolean): string{
        if(hero.blessing !== Blessing.none){
            let st = Blessing[hero.blessing];
            if(hero.pair_up === true){
                st += "_pairup";
            } else {
                if(hero.blessing_bonus.atk > 0){
                    st += "_atk";
                } else if(hero.blessing_bonus.spd > 0){
                    st += "_spd";
                } else if(hero.blessing_bonus.def > 0){
                    st += "_def";
                } else {
                    st += "_res";
                }
                
                if(hero.ar_extra === false){
                    st += "_01";
                } else {
                    st += "_02";
                }
            }
            
            if(isLarge === true){
                st += "_large.png";
            } else {
                st += "_small.png";
            }
            return st;
        } else if(hero.build.blessing !== Blessing.none){
            let st = Blessing[hero.build.blessing];
            if(hero.special_kind === Kind.duo){
                st += "_duo";
            } else if(hero.special_kind === Kind.harmonic){
                st += "_harmonized";
            } else {
                st += "_default"
            }
            if(isLarge === true){
                st += "_large.png";
            } else {
                st += "_small.png";
            }
            return st;
        }
        return "";
    }

    // public preloadAllIcons(): void{

    // }
}