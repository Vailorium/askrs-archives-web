import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BuildAPIModel, BuildModel, HeroInfoModel } from "../models";
import { UnitFinderService } from "./unit-finder.service";

@Injectable({
    providedIn: 'root'
})
export class BuildService{
    constructor(private http: HttpClient, private unitFinderService: UnitFinderService){

    }

    public convertFromAPIBuilds = (builds: BuildAPIModel[]): HeroInfoModel[] => {
        return builds.map(build => {
            return {
                build: build,
                ...this.unitFinderService.getHeroById(build.unitId)
            }
        });
        // return builds.map(build => {
        //     return {
        //         buildName: build.buildName,
        //         unitIdNum: build.heroId,
        //         visible: build.visible,
        //         rarity: build.rarity,
        //         merges: build.merges,
        //         skills: { weapon: build.skills.weapon, assist: build.skills.assist, special: build.skills.special, a: build.skills.a, b: build.skills.b, c: build.skills.c, s: build.skills.s},

        //     }
        // });
    }

    public getBuilds = (): Observable<Object> => {
        return this.http.get(`${environment.API_URL}/builds`, {withCredentials: true});
    }
}