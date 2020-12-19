import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MatGridTileFooterCssMatStyler } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { link } from 'fs';
import { Blessing, Dictionary, SaveDataModel, Stats } from 'src/app/models';
import { HeroInfoModel } from 'src/app/models/HeroInfoModel';
import { MapFinderService } from 'src/app/services/map-finder.service';
import { StatsCalcualator } from 'src/app/services/stats-calculator.service';
import { ARBuilderHeroesDialog } from './ar-builder-heroes-dialog/ar-builder-heroes-dialog';
import { ARBuilderSaveDialog } from './ar-builder-save-dialog/ar-builder-save-dialog';
import { ARBuilderStructuresDialog } from './ar-builder-structures-dialog/ar-builder-structures-dialog';
import { ARBuilderTerrainDialog } from './ar-builder-terrain-dialog/ar-builder-terrain-dialog';
import { AREditBuildDialog } from './ar-edit-build-dialog/ar-edit-build-dialog';

type ARTile = {slot?: number, uid?: string, image: string, display: string, folder: "aether_raids" | "units", type: "blank" | "building" | "trap" | "decoration" | "unit" | "hero" | "other", permanent: boolean, isSchool: boolean};

interface ARStructureData{
  image: string;
  display: string;
  description: string;
  costType: "heavenly_dew" | "aether_stone" | "rr_affinity";
  cost: number[];
}

const STRUCTURE_DATA: Dictionary<ARStructureData> = {"fortress": {image: "fortress", display: "Fortress", description: "If structure's level > opponent's Fortress (O) level, grants Atk/Spd/Def/Res+X to all allies. (X = difference in level × 4). Note: Cannot be removed or destroyed.", costType: "heavenly_dew", cost: [0,500,1000,1500,2000]}, "aether_amphorae": {image: "aether_amphorae", display: "Aether Amphorae", description: "Stores up to 100/150/200/250 Aether. If destroyed in an attack, it restores Aether to the raiding party (if they win). Note: Cannot be removed. Can be destroyed.", costType: "heavenly_dew", cost: [0,100,300,500]}, "aether_fountain": {image: "aether_fountain", display: "Aether Fountain", description: "Restores 50/60/70 Aether to the Aether Keep each day. If destroyed in an attack, it restores Aether to the raiding party (if they win). Note: Cannot be removed. Can be destroyed.", costType: "heavenly_dew", cost: [0, 100, 300]}, "armor_school": {image: "armor_school", display: "Armor School", description: "At start of turn, inflicts Atk/Spd/Def/Res -2/3/4/5/6/7/8 on armored foes within 3 columns centered on structure through their next actions. Note: Only one school can be placed at a time.", costType: "aether_stone", cost:[50,150,250,350,450,750,1000]}, "bolt_tower": {image: "bolt_tower", display: "Bolt Tower", description: "At the start of turn 3, deals 10/15/20/25/30/35/40 damage to foes within 7 rows and 3 columns centered on structure.", costType: "aether_stone", cost: [100,300,500,700,900,1500,2000]}, "bright_shrine": {image: "bright_shrine", display: "Bright Shrine", description: "At start of turn, inflicts Atk/Spd -2/3/4/5/6/7/8 on foe on the enemy team with the highest Atk+Spd total through its next action.", costType: "aether_stone", cost: [100,300,500,700,900,1500,2000]}, "catapult": {image: "catapult", display: "Catapult", description: "At start of turn, destroys offensive structures within the same column as this structure if their level ≤ this structure's level. Note: Fortress (O) cannot be destroyed.", costType: "aether_stone", cost: [100,300,500,700,900,1500,2000]}, "cavalry_school": {image: "cavalry_school", display: "Cavalry School", description: "At start of turn, inflicts Atk/Spd/Def/Res -2/3/4/5/6/7/8 on cavalry foes within 3 columns centered on structure through their next actions. Note: Only one school can be placed at a time.", costType: "aether_stone", cost: [50,150,250,350,450,750,1000]}, "dark_shrine": {image: "dark_shrine", display: "Dark Shrine", description: "At start of turn, inflicts Def/Res -2/3/4/5/6/7/8 on foe on the enemy team with the highest Def+Res total through its next action.", costType: "aether_stone", cost:[100,300,500,700,900,1500,2000]}, "duos_hindrance": {image: "duos_hindrance", display: "Duo's Hindrance", description: "If a Duo or Harmonized Hero is on the defensive team, foe cannot use Duo or Harmonized Skills between turn 1 and turn 3/4/5/6.", costType: "aether_stone", cost:[100,300,500,700]}, "flier_school": {image: "flier_school", display: "Flier School", description: "At start of turn, inflicts Atk/Spd/Def/Res -2/3/4/5/6/7/8 on flying foes within 3 columns centered on structure through their next actions. Note: Only one school can be placed at a time.", costType: "aether_stone", cost:[50,150,250,350,450,750,1000]},"healing_tower":{image: "healing_tower", display: "Healing Tower", description: "At start of turn, restores 10/15/20/25/30/35/40 HP to allies within 5 rows and 5 columns centered on structure.", costType: "aether_stone",cost:[100,300,500,700,900,1500,2000]},"infantry_school":{image: "infantry_school", display: "Infantry School", description: "At start of turn, inflicts Atk/Spd/Def/Res -2/3/4/5/6/7/8 on infantry foes within 3 columns centered on structure through their next actions. Note: Only one school can be placed at a time.", costType: "aether_stone", cost:[50,150,250,350,450,750,1000]},"panic_manor": {image: "panic_manor", display: "Panic Manor", description: "At start of turn, if any foes are within 7 rows and 3 columns centered on structure and their HP ≤ 40/45/50/55/60/65/70, converts bonuses on those foes into penalties through their next actions.", costType:"aether_stone", cost:[100,300,500,700,900,1500,2000]},"tactics_room":{image:"tactics_room",display:"Tactics Room", description: "At start of turn, if any foes are within 7 rows and 3 columns centered on structure and their HP ≤ 40 and they use bow, dagger, magic, or staff, restricts those foes' movement to 1 space through their next actions.", costType: "aether_stone", cost:[100,300,500,700,900,1500,2000]},"fake_bolt_trap":{image:"fake_bolt_trap", display: "False Bolt Trap", description: "This looks like a Bolt Trap, but it's just a fake.", costType:"aether_stone", cost:[0]},"fake_heavy_trap":{image:"fake_heavy_trap", display: "False Heavy Trap", description: "This looks like a Heavy Trap, but it's just a fake.", costType: "aether_stone", cost:[0]}, "bolt_trap": {image: "bolt_trap", display: "Bolt Trap", description: "If foe ends movement on this structure's space, deals 10/20/30/40/50 damage to target and units within 3 spaces. (Cancels foe's attack or Assist skill.)", costType: "aether_stone", cost:[0,100,300,500,700]}, "heavy_trap": {image: "heavy_trap", display: "Heavy Trap", description: "If foe ends movement on this structure's space, restricts movement of target and units within 2 spaces with HP ≤ 40/45/50/55/60 to 1 space through their next actions. (Cancels foe's attack and Assist skills.)", costType: "aether_stone", cost:[0,100,300,500,700]},"dining_hall": {image: "dining_hall", display: "Dining Hall", description: "An R&R structure for your Aether Resort.", costType: "rr_affinity", cost:[120]}, "field": {image: "field", display: "Field", description: "An R&R structure for your Aether Resort.", costType: "rr_affinity", cost: [0]}, "hot_spring": {image: "hot_spring", display: "Hot Spring", description: "An R&R structure for your Aether Resort.", costType: "rr_affinity", cost: [300]}, "inn": {image: "inn", display: "Inn", description: "An R&R structure for your Aether Resort.", costType: "rr_affinity", cost:[300]}};

@Component({
  selector: 'app-ar-builder',
  templateUrl: './ar-builder.component.html',
  styleUrls: ['./ar-builder.component.scss']
})
export class ArBuilderComponent implements OnInit {

  // AR Map Data
  public map: ARTile[] = [{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:true,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:true,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:true,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false},{image:"blank",display:"",folder:"aether_raids",type:"blank",permanent:false,isSchool:false}];
  public currentMap: string = "springwater";
  public units: HeroInfoModel[] = [];

  // AR Map Metadata
  public MAX_LIFT_LOSS = 100;
  public currentLiftLoss = 100;
  public counts = {defense: 1, traps: 0, decorations: 0};

  // Season Toggle
  public season: FormControl = new FormControl("6");

  // All Map Data Storage
  public maps: Dictionary<ARTile[]>;

  // Description Box Data
  public currentlyDisplayedStructure: ARStructureData;
  public currentlyDisplayedHero: HeroInfoModel;
  public currentlyDisplayedHeroStats: Stats = {hp: 0, atk: 0, def: 0, spd: 0, res: 0};

  // Enum
  public BlessingEnum = Blessing;

  constructor(private dialog: MatDialog, private mapFinder: MapFinderService, private stat: StatsCalcualator, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("AR-D Builder")
    this.maps = this.mapFinder.getARMaps();

    // Needs to be assigned so doesn't override map data
    this.map = Object.assign([], this.maps[this.currentMap]);

    // Compulsory structures
    this.updateMapStructures([{image: "aether_amphorae", display: "Aether Amphorae", folder: "aether_raids", type: "other", permanent: false, isSchool: false}, {image: "aether_fountain", display: "Aether Fountain", folder: "aether_raids", type: "other", permanent: false, isSchool: false}, {image: "fortress", display: "Fortress", folder: "aether_raids", type: "other", permanent: false, isSchool: false}]);
    
    this.season.valueChanges.subscribe((data) => {
      for(let i = 0; i < this.units.length; i++){
        if(!this.units[i].blessing){
          this.units[i].build.blessing = data; // updates unit build blessing if unit isn't legendary/mythic
        }
        if(this.currentlyDisplayedHero){
          this.currentlyDisplayedHeroStats = this.stat.calculateAllStats(this.currentlyDisplayedHero, {season: [parseInt(data)], allies: this.units}); // updates hero stats
        }
        this.currentLiftLoss = this.calculateLiftLoss();
      }
    });
  }

  openDescription(tile: ARTile) {
    // Opens hero or structure description when clicked
    // Generic function because of grid structure
    if(tile.display !== "" && tile.type !== "hero"){
      this.currentlyDisplayedStructure = STRUCTURE_DATA[tile.image];
    } else if(tile.type === "hero"){
      this.currentlyDisplayedHero = this.units.filter(a => a.uid === tile.uid)[0];
      this.currentlyDisplayedHeroStats = this.stat.calculateAllStats(Object.assign({}, this.currentlyDisplayedHero), {season: [parseInt(this.season.value)], allies: this.units});
    }
  }

  changeMap(mapName: string) {
    // Updates map to different type (e.g. springwater -> desert)
    //TODO: this will become bugged if permanent tiles are added in first two rows of map as it doesn't account for hero tiles
    let newMap = Object.assign([], this.maps[mapName]);
    for(let i = 0; i < this.map.length; i++){
      if(this.map[i].type !== "blank"){
        if(newMap[i].permanent){
          for(let j = 1; j < 36; j++){
            if(i - j >= 0){
              let tile = newMap[i - j];
              if(!tile.permanent && tile.display === "" && tile.type === "blank"){
                newMap[i - j] = this.map[i];
                break;
              } 
            }

            if(i + j <= 35){
              let tile = newMap[i + j];
              if(!tile.permanent && tile.display === "" && tile.type === "blank" && this.map[i + j].type === "blank"){
                newMap[i + j] = this.map[i];
                break;
              }
            }
          }
        } else {
          newMap[i] = this.map[i];
        }
      }
    }
    this.map = Object.assign([], newMap);
    this.currentMap = mapName;
  }

  openStructuresDialog() {
    let structuresDialog = this.dialog.open(ARBuilderStructuresDialog, {
      width: '450px',
      height: '80%',
      data: this.map.filter(a => a.display !== "").map(b => b.image)
    });

    structuresDialog.afterClosed().subscribe((res: ARTile[]) => {
      // Updates map structures and counts
      this.updateMapStructures(res);
      this.counts.defense = res.filter(a => a.type === "building" || a.display === "Fortress").length;
      this.counts.traps = res.filter(a => a.type === "trap").length;
      this.counts.decorations = res.filter(a => a.type === "decoration").length;
    });
  }

  updateMapStructures(structures: ARTile[]){
    //TODO: comment this mess sometime
    if(structures.length > 0){
      if(!structures[0].uid){ // is building update
        let flattenedNew = structures.map(a => a.image);
        let toRemove = this.map.filter(a => a.display !== "" && a.type !== "hero" && !flattenedNew.includes(a.image)).map(b => b.image); //this should work for breakable walls and stuff
        for(let i = 0; i < this.map.length; i++){
          if(toRemove.includes(this.map[i].image)){
            this.map[i] = {image: "blank", display: "", folder: "aether_raids", type: "blank", permanent: false, isSchool: false};
          }
        }
    
        let flattenedCurrent = this.map.map(a => a.image);
        for(let structure of structures){
          if(flattenedCurrent.includes(structure.image)){
            continue;
          } else {
            for(let i = 0; i < this.map.length; i++){
              if(this.map[i].image === "blank" && this.map[i].permanent === false){
                this.map[i] = structure;
                break;
              }
            }
          }
        }
      } else { // is hero update
        console.log("hero update");
        let currentHeroes = this.map.map((a, i) => {return {...a, ...{index: i}}}).filter(a => a.uid);
        let currentUID = this.map.filter(a => a.uid).map(b => b.uid);
        let newUID = structures.map(a => a.uid);
        for(let hero of currentHeroes){
          if(!newUID.includes(hero.uid)){
            this.map[hero.index] = {image: "blank", display: "", folder: "aether_raids", type: "blank", permanent: false, isSchool: false};
          }
        }
        
        let removalPriority = this.map.filter((a, i) => i < 12).map((b, i) => {return {...b, ...{index: i}}}).filter((c, i) => c.display !== "" && c.type !== "hero");
        console.log(this.map.filter((a, i) => i < 12));
        for(let hero of structures){
          if(!currentUID.includes(hero.uid)){
            for(let i = 0; i < this.map.length; i++){
              if(this.map[i].image === "blank" && this.map[i].permanent === false){
                if(i < 12){
                  this.map[i] = hero;
                } else {
                  let toRemove = removalPriority.shift();
                  this.map[toRemove.index] = hero;
                  delete toRemove['index'];
                  this.map[i] = toRemove;
                }
                break;
              }
            }
          }
        }
      }
    }
  }

  openHeroesDialog(){
    let heroesDialog = this.dialog.open(ARBuilderHeroesDialog, {
      width: '450px',
      height: '80%',
      data: this.units
    });

    heroesDialog.afterClosed().subscribe((res: HeroInfoModel[]) => {
      let heroes = [];
      for(let i = 0; i < res.length; i++){
        if(!res[i].blessing){
          res[i].build.blessing = parseInt(this.season.value);
        }
        heroes.push({slot: i, uid: res[i].uid, image: res[i].id, display: res[i].name + ": " + res[i].title, folder: "units", type: "hero", permanent: false, isSchool: false});
      }
      if(this.currentlyDisplayedHero){
        this.currentlyDisplayedHeroStats = this.stat.calculateAllStats(this.currentlyDisplayedHero, {season: [parseInt(this.season.value)], allies: this.units});
        if(heroes.filter(a => a.uid === this.currentlyDisplayedHero.uid).length === 0){
          this.currentlyDisplayedHero = undefined;
        }
      }
      this.updateMapStructures(heroes);
      this.units = res;
      this.currentLiftLoss = this.calculateLiftLoss();
    });
  }

  openTerrainDialog(){
    let terrainDialog = this.dialog.open(ARBuilderTerrainDialog, {
      width: '450px',
      height: '80%',
      data: this.currentMap
    });

    terrainDialog.afterClosed().subscribe((res: string) => {
      this.changeMap(res);
    });
  }

  openEditBuildDialog(){
    let editBuildDialog = this.dialog.open(AREditBuildDialog, {
      width: '30%',
      height: '80%',
      data: this.currentlyDisplayedHero
    });

    editBuildDialog.afterClosed().subscribe((res: HeroInfoModel) => {
      console.log(res);
      this.currentlyDisplayedHero = res;
      for(let i = 0; i < this.units.length; i++){
        if(this.units[i].uid === res.uid){
          this.units[i] = res;
        }
      }
      this.currentlyDisplayedHeroStats = this.stat.calculateAllStats(Object.assign({}, this.currentlyDisplayedHero), {season: [parseInt(this.season.value)], allies: this.units});
      this.currentLiftLoss = this.calculateLiftLoss();
    });
  }

  drop(event: CdkDragDrop<any>){
    if(!event.container.data.item.permanent){
      if(event.previousContainer.data.item.type === "hero"){
        if(event.container.data.index < 12){
          this.map[event.container.data.index] = event.previousContainer.data.item;
          this.map[event.previousContainer.data.index] = event.container.data.item;
        }
      } else {
        if(!(event.previousContainer.data.index > 11 && event.container.data.item.type === "hero")){
          this.map[event.container.data.index] = event.previousContainer.data.item;
          this.map[event.previousContainer.data.index] = event.container.data.item;
        }
      }
    }
  }

  calculateLiftLoss(): number{
    let max = this.MAX_LIFT_LOSS;
    let numMythics = 0;
    let numBlessed = 0;
    for(let unit of this.units){
      console.log(unit.blessing, this.season.value);
      if(this.season.value == unit.blessing){ // == as season.value is string, unit.blessing is int
        max -= unit.build.merges;
        if(numMythics < 2){
          numMythics += 1;
        }
      } else if(unit.build.blessing == this.season.value){
        numBlessed += 1;
      }
    }
    max -= numMythics * numBlessed * 5;
    console.log(max, numMythics, numBlessed);
    return max;
  }

  exportData(){
    let href = "data:application/json;charset=utf-8,";
    let data = {map: this.currentMap, mapData: this.map, unitData: this.units, season: this.season.value};
    href += JSON.stringify(data);
    let encodedURI = encodeURI(href);

    let a = document.createElement("a");
    a.setAttribute("download", "ar_export.json");
    a.setAttribute('style', 'visibility:hidden');
    a.setAttribute('href', encodedURI);

    document.body.appendChild(a);
    a.click();
  }

  openSaveDialog(){
    let save = this.dialog.open(ARBuilderSaveDialog, {
      height: "80%",
      width: "450px",
      data: {map: this.currentMap, mapData: this.map, unitData: this.units, season: this.season.value}
    });

    save.afterClosed().subscribe((res?: SaveDataModel) => {
      save = null;
      if(res){
        this.currentMap = res.map;
        this.map = res.mapData;
        this.units = res.unitData;
        this.season.setValue(res.season);

        this.counts.defense = res.mapData.filter(a => a.type === "building" || a.display === "Fortress").length;
        this.counts.traps = res.mapData.filter(a => a.type === "trap").length;
        this.counts.decorations = res.mapData.filter(a => a.type === "decoration").length;

        this.currentLiftLoss = this.calculateLiftLoss();
      }
    });
  }
}