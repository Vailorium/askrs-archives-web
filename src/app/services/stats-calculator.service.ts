import { Injectable } from '@angular/core';
import { IVS, Stats } from '../models';
import { ARHeroInfoModel, HeroInfoModel } from '../models/HeroInfoModel';

@Injectable({
    providedIn: 'root'
})
export class StatsCalcualator{
    constructor(){}

    rarityGrowths: number[] = [86, 93, 100, 107, 114];

    calculateAllStats(hero: ARHeroInfoModel, settings?: {season?: number[], allies?: ARHeroInfoModel[]}): Stats{

        // if no hero, return empty stat spread
        if(!hero){
            return {hp: 0, atk: 0, spd:0,def:0,res:0};
        }

        let stats = {hp: 0,atk: 0,spd:0,def:0,res:0};
        let bst = Object.assign({}, hero.base_stats);

        // Orders stats in highest -> lowest (HP is always the last)
        let orderedStats = Object.keys(bst).sort((a,b) => {if(b === "hp"){return -1;} return bst[b] - bst[a]});
        
        // Orders stats in highest -> lowest
        let orderedStatsMerges = Object.keys(bst).sort((a,b) => {return bst[b] - bst[a]});

        // Duplicates orderedStatsMerges
        let orderedDragonFlowers = Object.assign([], orderedStatsMerges);

        // bst is default for 3* for 4*/5*, bst needs to be increased
        if(hero.build.rarity === 4){
            for(let i = 0; i < 2; i++){
                let stat = orderedStats.shift();
                bst[stat] += 1;
            }
        } else if(hero.build.rarity === 5){
            for(let i = 0; i < 5; i++){
                let stat = orderedStats.shift();
                bst[stat] += 1;
            }
        }
        
        // Increases growths/bst based on boon bane, no bane applied if hero's merges are 0
        let growths = Object.assign({}, hero.growth_rates);
        if(hero.build.ivs.boon !== 0){
            growths[IVS[hero.build.ivs.boon]] += 5;
            bst[IVS[hero.build.ivs.boon]] += 1;
        }
        if(hero.build.ivs.bane !== 0 && hero.build.merges === 0){
            growths[IVS[hero.build.ivs.bane]] -= 5;
            bst[IVS[hero.build.ivs.boon]] -= 1;
        }


        // Calculates growth values using formula Trunc(Level Increase * (Trunc(stat growth * rarity multiplier)))
        // divisions are required due to floating point errors in javascript
        for(let stat of Object.keys(growths)){
            let value = Math.floor(39 * (Math.floor(growths[stat] * this.rarityGrowths[hero.build.rarity - 1] / 100) / 100));
            stats[stat] = bst[stat] + value + (hero.build.skills.weapon ? hero.build.skills.weapon.stats[stat] : 0) + (hero.build.skills.assist ? hero.build.skills.assist.stats[stat] : 0) + (hero.build.skills.special ? hero.build.skills.special.stats[stat] : 0) + (hero.build.skills.a ? hero.build.skills.a.stats[stat] : 0) + (hero.build.skills.b ? hero.build.skills.b.stats[stat] : 0) + (hero.build.skills.c ? hero.build.skills.c.stats[stat] : 0) + (hero.build.skills.c ? hero.build.skills.c.stats[stat] : 0);
        }

        // Merge stat increases
        for(let i = 0; i < hero.build.merges; i++){
            if(i === 0 && hero.build.ivs.boon === IVS.neutral){ // neutral iv increase. boon iv increase is done when increasing bst & growth value for stat
                let statsTop = orderedStatsMerges.slice(0,3);
                for(let stat of statsTop){
                    stats[stat] += 1;
                }
            }
            for(let j = 0; j < 2; j++){
                let stat = orderedStatsMerges.shift();
                stats[stat] += 1;
                orderedStatsMerges.push(stat);
            }
        }

        // Dragonflowers
        for(let i = 0; i < hero.build.dragonflowers; i++){
            let stat = orderedDragonFlowers.shift();
            stats[stat] += 1;
            orderedDragonFlowers.push(stat);
        }

        // Resplendent stat increase
        if(hero.build.resplendent){
            for(let stat of Object.keys(stats)){
                stats[stat] += 2;
            }
        }

        if(settings){
            //TODO: potential bug/issue, if season is set to legendary season and mythic/legendary are paired, neither will get buff
            //TODO: this is important if I ever add multiple seasons to AR-D builder as legendary heroes won't get mythic stat boosts
            if(settings.season && settings.allies && !settings.season.includes(hero.blessing)){ //
                for(let ally of settings.allies){
                    if(ally.uid !== hero.uid && settings.season.includes(ally.blessing) && ally.blessing !== 0){
                        for(let stat of Object.keys(ally.blessing_bonus)){
                            stats[stat] += ally.blessing_bonus[stat];
                        }
                    }
                }
            }
        }

        // add weapon might to atk stat
        stats.atk += hero.build.skills.weapon ? hero.build.skills.weapon.might : 0;

        return stats;
    }
}