import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BuildModel, HeroInfoModel, SkillModel } from "../models";
import { UnitFinderService } from "./unit-finder.service";

@Injectable({
    providedIn: 'root'
})
export class BuildService{
    constructor(private http: HttpClient, private unitFinderService: UnitFinderService){

    }

    public convertFromAPIBuilds = (builds: BuildModel[]): HeroInfoModel[] => {
        return builds.map(build => {
            return {
                build: build,
                ...this.unitFinderService.getHeroById(build.unitId)
            }
        });
    }

    public getBuilds = (): Observable<Object> => {
        return this.http.get(`${environment.API_URL}/builds`, {withCredentials: true});
    }

    public createBuild = (unitId: string, rarity: number, merges: number, skills: {weapon?: SkillModel, assist?: SkillModel, special?: SkillModel, a?: SkillModel, b?: SkillModel, c?: SkillModel, s?: SkillModel}, resplendent: boolean, ivs: {boon: number, bane: number}, dragonflowers: number, blessing: number, allySupport: {rank: number, allyUnitId?: string}, summonerSupport: number, options: {buildName?: string, userName?: string, buildId?: number, visible?: boolean}): BuildModel => {
        return {buildName: options.buildName, userName: options.userName, buildId: options.buildId, unitId: unitId, visible: options.visible, rarity: rarity, merges: merges, skills: skills, resplendent: resplendent, ivs: {boon: ivs.boon, bane: ivs.bane}, dragonflowers: dragonflowers, blessing: blessing, allySupport: allySupport, summonerSupport: summonerSupport};
    }
}