import { Injectable } from "@angular/core";
import { exception } from "console";
import { ARTile, Buildings, Decorations, Dictionary, HeroDataModel, HeroInfoModel, IVS, Maps, SkillModel, Traps } from "../models";
import { MapFinderService } from "./map-finder.service";
import { SkillsService } from "./skills.service";
import { SystemService } from "./system.service";
import { UnitFinderService } from "./unit-finder.service";
const short = require('short-uuid');

@Injectable({
    providedIn: 'root'
})
export class ARDService{

    public buildings: ARTile[] = [{image: "aether_amphorae", display: "Aether Amphorae", folder: "aether_raids", type: "other", permanent: false, selected: true, isSchool: false}, {image: "aether_fountain", display: "Aether Fountain", folder: "aether_raids", type: "other", permanent: false, selected: true, isSchool: false}, {image: "armor_school", display: "Armor School", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: true}, {image: "bolt_tower", display: "Bolt Tower", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "bright_shrine", display: "Bright Shrine", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false},{image: "catapult", display: "Catapult", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "cavalry_school", display: "Cavalry School", folder: "aether_raids", type:"building", permanent: false, selected: false, isSchool: true}, {image: "dark_shrine", display: "Dark Shrine", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "duos_hindrance", display: "Duo's Hindrance", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "flier_school", display: "Flier School", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: true}, {image: "fortress", display: "Fortress", folder: "aether_raids", type: "other", permanent: false, selected: true, isSchool: false}, {image: "healing_tower", display: "Healing Tower", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "infantry_school", display: "Infantry School", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: true}, {image: "panic_manor", display: "Panic Manor", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "tactics_room", display: "Tactics Room", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}];
    public traps: ARTile[] = [{image: "bolt_trap", display: "Bolt Trap", folder: "aether_raids", type: "trap", permanent: false, isSchool: false}, {image: "fake_bolt_trap", display: "Fake Bolt Trap", folder: "aether_raids", type: "trap", permanent: false, isSchool: false}, {image: "heavy_trap", display: "Heavy Trap", folder: "aether_raids", type: "trap", permanent: false, isSchool: false}, {image: "fake_heavy_trap", display: "Fake Heavy Trap", folder: "aether_raids", type: "trap", permanent: false, isSchool: false}];
    public decorations: ARTile[] = [{image: 'dining_hall', display: "Dining Hall", folder: "aether_raids", type:"decoration", permanent: false, isSchool: false}, {image: 'field', display: "Field", folder: "aether_raids", type:"decoration", permanent: false, isSchool: false}, {image: 'hot_spring', display: "Hot Spring", folder: "aether_raids", type:"decoration", permanent: false, isSchool: false}, {image: 'inn', display: "Inn", folder: "aether_raids", type:"decoration", permanent: false, isSchool: false}];

    public structures: Dictionary<ARTile> = {"aether_amphorae":{"image":"aether_amphorae","display":"Aether Amphorae","folder":"aether_raids","type":"other","permanent":false,"selected":true,"isSchool":false},"aether_fountain":{"image":"aether_fountain","display":"Aether Fountain","folder":"aether_raids","type":"other","permanent":false,"selected":true,"isSchool":false},"armor_school":{"image":"armor_school","display":"Armor School","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":true},"bolt_tower":{"image":"bolt_tower","display":"Bolt Tower","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":false},"bright_shrine":{"image":"bright_shrine","display":"Bright Shrine","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":false},"catapult":{"image":"catapult","display":"Catapult","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":false},"cavalry_school":{"image":"cavalry_school","display":"Cavalry School","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":true},"dark_shrine":{"image":"dark_shrine","display":"Dark Shrine","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":false},"duos_hindrance":{"image":"duos_hindrance","display":"Duo's Hindrance","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":false},"flier_school":{"image":"flier_school","display":"Flier School","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":true},"fortress":{"image":"fortress","display":"Fortress","folder":"aether_raids","type":"other","permanent":false,"selected":true,"isSchool":false},"healing_tower":{"image":"healing_tower","display":"Healing Tower","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":false},"infantry_school":{"image":"infantry_school","display":"Infantry School","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":true},"panic_manor":{"image":"panic_manor","display":"Panic Manor","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":false},"tactics_room":{"image":"tactics_room","display":"Tactics Room","folder":"aether_raids","type":"building","permanent":false,"selected":false,"isSchool":false},"bolt_trap":{"image":"bolt_trap","display":"Bolt Trap","folder":"aether_raids","type":"trap","permanent":false,"isSchool":false},"fake_bolt_trap":{"image":"fake_bolt_trap","display":"Fake Bolt Trap","folder":"aether_raids","type":"trap","permanent":false,"isSchool":false},"heavy_trap":{"image":"heavy_trap","display":"Heavy Trap","folder":"aether_raids","type":"trap","permanent":false,"isSchool":false},"fake_heavy_trap":{"image":"fake_heavy_trap","display":"Fake Heavy Trap","folder":"aether_raids","type":"trap","permanent":false,"isSchool":false},"dining_hall":{"image":"dining_hall","display":"Dining Hall","folder":"aether_raids","type":"decoration","permanent":false,"isSchool":false},"field":{"image":"field","display":"Field","folder":"aether_raids","type":"decoration","permanent":false,"isSchool":false},"hot_spring":{"image":"hot_spring","display":"Hot Spring","folder":"aether_raids","type":"decoration","permanent":false,"isSchool":false},"inn":{"image":"inn","display":"Inn","folder":"aether_raids","type":"decoration","permanent":false,"isSchool":false}};
    heroes: HeroDataModel[];
    allSkillsByCategory: SkillModel[][]; //TODO: this only includes max tier skills
    constructor(private system: SystemService, private unit: UnitFinderService, private skill: SkillsService, private mapFinder: MapFinderService){
        this.heroes = this.unit.getHeroList();
        this.allSkillsByCategory = this.skill.getAllMaxSkillsCategories();
    }
    
    updateCounts(map: ARTile[]): {defense: number, traps: number, decorations: number}{
        let total = {defense: 0, traps: 0, decorations: 0};
        for(let tile of map){
            if(tile.type === "building" || tile.image === "fortress"){
                total.defense++;
            } else if(tile.type === "trap"){
                total.traps++;
            } else if(tile.type === "decoration"){
                total.decorations++;
            }
        }
        return total;
    }

    getStructureByIndex(type: string, index: number): ARTile{
        if(type === "building"){
            return this.buildings[index];
        } else if(type === "trap"){
            return this.traps[index];
        } else if(type === "decoration"){
            return this.decorations[index];
        }
    }

    getStructureById(id: string): ARTile{
        return this.structures[id];
    }

    getLink(mapName: string, map: ARTile[], units: HeroInfoModel[], season: number): string{
        //TODO: highest encodable number with two characters is 1295 (i.e. 1296 options) - needs to be increased to 3 digits if hero count ever doubles and i still do this
        let link = "";

        // Encoding version
        link += "1";

        // Map name encoding
        let mapNumber = Maps[mapName];
        link += this.system.base36Encode(mapNumber, 1);

        // Season encoding
        link += this.system.base36Encode(season, 1);

        // Building encoding - building index in enum (length 1) + building location on map (length 1)
        let buildings = map.map((a, i) => {return {tile: a, index: i}}).filter(a => a.tile.display === "Fortress" || a.tile.type === "building");
        let traps = map.map((a, i) => {return {tile: a, index: i}}).filter(a => a.tile.type === "trap");
        let decorations = map.map((a, i) => {return {tile: a, index: i}}).filter(a => a.tile.type === "decoration");

        // aether items first - only location needed!
        let fountain = map.findIndex(a => a.image === "aether_fountain");
        link += this.system.base36Encode(fountain, 1);

        let amphorae = map.findIndex(a => a.image === "aether_amphorae");
        link += this.system.base36Encode(amphorae, 1);

        for(let i = 0; i < 6; i++){
            let building = buildings[i];
            if(!building){
                link += "$";
                break;
            }
            console.log(building.tile.image, Buildings[building.tile.image]);
            link += this.system.base36Encode(building ? Buildings[building.tile.image] + 1 : 0, 1);
            link += this.system.base36Encode(building ? building.index : 0, 1); // will never be > 35, 0 means multiple things here but no worry
        }

        for(let i = 0; i < 4; i++){
            let trap = traps[i];
            if(!trap){
                link += "$";
                break;
            }
            link += this.system.base36Encode(trap ? Traps[trap.tile.image] + 1 : 0, 1);
            link += this.system.base36Encode(trap ? trap.index : 0, 1); // will never be > 35, 0 means multiple things here but no worry
        }

        for(let i = 0; i < 4; i++){
            let decoration = decorations[i];
            if(!decoration){
                link += "$";
                break;
            }
            link += this.system.base36Encode(decoration ? Decorations[decoration.tile.image] + 1 : 0, 1);
            link += this.system.base36Encode(decoration ? decoration.index : 0, 1); // will never be > 35, 0 means multiple things here but no worry
        }

        for(let hero of units){
            let tile = map.findIndex(a => a.uid === hero.uid);
            // let tile = map.map((a, i) => {return {tile: a, index: i}}).filter(a => {if(a.tile.uid){a.tile.uid === hero.uid}})[0];

            // encode hero index first
            console.log(this.heroes.findIndex((a) => {return a.id === hero.id}), hero.id, this.heroes);
            let index = this.heroes.findIndex((a) => {return a.id === hero.id});
            link += this.system.base36Encode(index, 2);

            // encode location next
            link += this.system.base36Encode(tile, 1);

            //encode build next
            let build = hero.build;

            console.log(build.skills.weapon)
            let listToAdd = [build.merges, build.dragonflowers, build.rarity, build.resplendent === true ? 1 : 0, build.ivs.boon, build.ivs.bane, build.skills.weapon ? (build.skills.weapon.refined ? 1 : 0) : 0,
                build.skills.weapon ? (build.skills.weapon.refined ? this.allSkillsByCategory[0].findIndex(a => {return a.id === this.skill.getBaseForm(build.skills.weapon.id).id}) + 1 : this.allSkillsByCategory[0].findIndex(a => {return a.id === build.skills.weapon.id}) + 1) : 0,
                build.skills.weapon ? (build.skills.weapon.refined ? this.skill.getRefinesById(this.skill.getBaseForm(build.skills.weapon.id).id).findIndex(a => {return a.id === build.skills.weapon.id}) + 1: 0) : 0,
                build.skills.assist ? this.allSkillsByCategory[1].findIndex(a => {return a.id === build.skills.assist.id}) + 1 : 0,
                build.skills.special ? this.allSkillsByCategory[2].findIndex(a => {return a.id === build.skills.special.id}) + 1 : 0,
                build.skills.a ? this.allSkillsByCategory[3].findIndex(a => {return a.id === build.skills.a.id}) + 1 : 0,
                build.skills.b ? this.allSkillsByCategory[4].findIndex(a => {return a.id === build.skills.b.id}) + 1 : 0,
                build.skills.c ? this.allSkillsByCategory[5].findIndex(a => {return a.id === build.skills.c.id}) + 1 : 0,
                build.skills.s ? this.allSkillsByCategory[6].findIndex(a => {return a.id === build.skills.s.id}) + 1 : 0
            ];

            console.log(this.allSkillsByCategory[4]);

            for(let i = 0; i < listToAdd.length; i++){
                if(listToAdd.slice(i, listToAdd.length).reduce((a,b) => a + b) === 0){
                    link += "$";
                    break;
                }
                let length = (i < 7 || i == 8) ? 1 : 2;
                console.log(length);
                console.log(listToAdd);
                link += this.system.base36Encode(listToAdd[i], length);
            }
        }

        console.log(mapName, map, units, season);
        return encodeURIComponent(link);
    }

    getDataFromLink(link: string){
        try{
            let data = decodeURIComponent(link).split('');

            let version = data.splice(0, 1).join('');
            if(version === "1"){
                // metadata
                let mapNumber = this.system.base36Decode(data.splice(0, 1).join(''));
                let mapName = Maps[mapNumber];

                let season = data.splice(0, 1).join('');

                // structures
                let map = Object.assign([], this.mapFinder.getARMapById(mapName));

                map[this.system.base36Decode(data.splice(0,1).join(''))] = {image: "aether_fountain", display: "Aether Fountain", folder: "aether_raids", type: "other", permanent: false, selected: true, isSchool: false};
                map[this.system.base36Decode(data.splice(0,1).join(''))] = {image: "aether_amphorae", display: "Aether Amphorae", folder: "aether_raids", type: "other", permanent: false, selected: true, isSchool: false};

                for(let i = 0; i < 6; i++){
                    if(data[0] === "$"){
                        data.splice(0,1);
                        break;
                    }
                    let building = this.getStructureById(Buildings[this.system.base36Decode(data.splice(0,1).join('')) - 1]);
                    map[this.system.base36Decode(data.splice(0,1).join(''))] = building;
                }

                for(let i = 0; i < 4; i++){
                    if(data[0] === "$"){
                        data.splice(0,1);
                        break;
                    }
                    let trap = this.getStructureById(Traps[this.system.base36Decode(data.splice(0,1).join('')) - 1]);
                    map[this.system.base36Decode(data.splice(0,1).join(''))] = trap;
                }

                for(let i = 0; i < 4; i++){
                    if(data[0] === "$"){
                        data.splice(0,1);
                        break;
                    }
                    let decoration = this.getStructureById(Decorations[this.system.base36Decode(data.splice(0,1).join('')) - 1]);
                    map[this.system.base36Decode(data.splice(0,1).join(''))] = decoration;
                }

                var heroData: HeroDataModel, uid, loc, merges, df, rarity, resplendent, boon, bane, refined, weapon, assist, special, a, b, c, seal;
                
                let heroesData: HeroInfoModel[] = [];
                for(let i = 0; i < 6; i++){
                    if(data[0] === "$") data.splice(0,1);
                    if(data.length === 0){
                        break;
                    }
                    if(heroData){
                        heroesData.push({...heroData, uid: uid, build: {rarity: rarity, merges: merges, dragonflowers: df, resplendent: resplendent ? true : false,
                        ivs: {boon: boon ? boon : 0, bane: bane ? bane : 0}, blessing: heroData.blessing ? heroData.blessing : parseInt(season), skills: {
                            weapon: weapon, assist: assist, special: special, a: a, b: b, c: c, s: seal
                        }}});
                        map[loc] = {slot: i - 1, uid: uid, image: heroData.image, display: heroData.name + ": " + heroData.title, folder: "units", type: "hero", permanent: false, isSchool: false};
                        heroData = uid = loc = merges = df = rarity = resplendent = boon = bane = refined = weapon = assist = special = a = b = c = seal = undefined;    
                    }
                    //{"slot":0,"uid":"8qQ2HRfeGiJ3VcG8kapPHQ","image":"bernadetta_2","display":"Bernadetta: Frosty Shut-In","folder":"units","type":"hero","permanent":false,"isSchool":false}

                    heroData = this.heroes[this.system.base36Decode(data.splice(0, 2).join(''))];
                    console.log(this.heroes.findIndex((a) => {return a.id === heroData.id}), heroData.id);
                    uid = short.generate();

                    loc = this.system.base36Decode(data.splice(0,1).join(''))
                    merges = this.system.base36Decode(data.splice(0,1).join(''));
                    df = this.system.base36Decode(data.splice(0,1).join(''));
                    rarity = this.system.base36Decode(data.splice(0,1).join(''));

                    if(data[0] === "$") continue;
                    resplendent = this.system.base36Decode(data.splice(0,1).join(''));

                    if(data[0] === "$") continue;
                    boon = this.system.base36Decode(data.splice(0,1).join(''));

                    if(data[0] === "$") continue;
                    bane = this.system.base36Decode(data.splice(0,1).join(''));

                    // weapon data
                    if(data[0] === "$") continue;
                    refined = this.system.base36Decode(data.splice(0,1).join(''));

                    weapon = this.allSkillsByCategory[0][this.system.base36Decode(data.splice(0,2).join('')) - 1];

                    if(data[0] === "$") continue;
                    if(refined){
                        // console.log(this.skill.getAllRefines())
                        weapon = this.skill.getAllRefines()[weapon.id][this.system.base36Decode(data.splice(0,1).join('')) - 1];
                    } else {
                        data.splice(0,1);
                    }

                    // assist special ... seal data
                    if(data[0] === "$") continue;
                    assist = this.allSkillsByCategory[1][this.system.base36Decode(data.splice(0,2).join('')) - 1];

                    if(data[0] === "$") continue;
                    special = this.allSkillsByCategory[2][this.system.base36Decode(data.splice(0,2).join('')) - 1];

                    if(data[0] === "$") continue;
                    a = this.allSkillsByCategory[3][this.system.base36Decode(data.splice(0,2).join('')) - 1];

                    if(data[0] === "$") continue;
                    b = this.allSkillsByCategory[4][this.system.base36Decode(data.splice(0,2).join('')) - 1];

                    if(data[0] === "$") continue;
                    c = this.allSkillsByCategory[5][this.system.base36Decode(data.splice(0,2).join('')) - 1];

                    if(data[0] === "$") continue;
                    seal = this.allSkillsByCategory[6][this.system.base36Decode(data.splice(0,2).join('')) - 1];
                }
                if(heroData){
                    heroesData.push({...heroData, uid: uid, build: {rarity: rarity, merges: merges, dragonflowers: df, resplendent: resplendent ? true : false,
                    ivs: {boon: boon ? boon : 0, bane: bane ? bane : 0}, blessing: heroData.blessing ? heroData.blessing : parseInt(season), skills: {
                        weapon: weapon, assist: assist, special: special, a: a, b: b, c: c, s: seal
                    }}});
                    map[loc] = {slot: heroesData.length, uid: uid, image: heroData.image, display: heroData.name + ": " + heroData.title, folder: "units", type: "hero", permanent: false, isSchool: false};
                }

                console.log(mapName, map, heroesData, season);
                return {mapName, map, heroesData, season};
            } else {
                throw "Unaccepted version of encoding";
            }
        } catch (err){
            // TODO: ERROR HANDLING
            console.log("Unknown error occured");
            console.log(err);
        }
    }
}