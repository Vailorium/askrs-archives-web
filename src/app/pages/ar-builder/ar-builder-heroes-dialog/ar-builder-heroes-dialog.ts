import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { Blessing, HeroDataModel, HeroTableModel, IVS } from 'src/app/models';
import { BuildModel } from 'src/app/models/BuildModel';
import { HeroInfoModel } from 'src/app/models/HeroInfoModel';
import { UnitFinderService } from 'src/app/services/unit-finder.service';
const short = require('short-uuid');

@Component({
    selector: 'ar-builder-heroes-dialog',
    templateUrl: './ar-builder-heroes-dialog.html',
    styleUrls: ['./ar-builder-heroes-dialog.scss']
})
export class ARBuilderHeroesDialog {

    heroList: HeroDataModel[][];
    baseList: HeroDataModel[];
    unfilteredList: HeroDataModel[];

    heroFilter: FormGroup;
    season: number;
    pageNumber: number = 0;

    selectedHeroes: HeroInfoModel[] = [];
    
    constructor(public dialogRef: MatDialogRef<ARBuilderHeroesDialog>, private heroes: UnitFinderService, private fb: FormBuilder, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: {units: HeroInfoModel[], season: number}){
        this.selectedHeroes = data.units;
        this.season = data.season;
        this.heroFilter = this.fb.group({
            name: [''],
            blessing: ['0']
        });
        this.unfilteredList = Object.assign([], this.heroes.getHeroList()).sort((a, b) => {
            if(a.image < b.image){
                return -1
            } else {
                return 1;
            }
        });
        this.updateFilter();

        this.dialogRef.beforeClosed().subscribe( // overwrites default exiting behaviour - important if user clicks outside of dialog to close
            () => {
                this.dialogRef.close(this.selectedHeroes);
            }
        );
    }

    changePage(ev: PageEvent){
        this.pageNumber = ev.pageIndex;
    }

    updateFilter(){ //TODO: this is bugged sometimes idk why

        let filters = this.heroFilter.value;
        this.baseList = this.unfilteredList.filter(a => a.name.toLowerCase().includes(filters['name'].toLowerCase()));
        if(filters.blessing !== "0"){
            this.baseList = this.baseList.filter(a => a.blessing === parseInt(filters.blessing));
        }
        this.heroList = [];
        for(let i = 0; i < this.baseList.length; i++){
            if(i % 25 === 0){
                this.heroList.push([]);
            }
            this.heroList[this.heroList.length - 1].push(this.baseList[i]);
        }

        if(this.pageNumber > this.heroList.length - 1){
            this.pageNumber = this.heroList.length - 1;
        }
    }
    
    addHero(hero: HeroDataModel){
        if(this.selectedHeroes.length < 6){
            let baseBuild: BuildModel = {blessing: hero.blessing, rarity: 5, merges: 0, skills: {}, resplendent: false, ivs: {boon: IVS.neutral, bane: IVS.neutral}, dragonflowers: 0};
            this.selectedHeroes.push({...hero, ...{build: baseBuild, uid: short.generate()}});
        } else if((this.hasARExtra() || (hero.ar_extra === true && hero.blessing === this.season)) && this.selectedHeroes.length < 7) {
            let baseBuild: BuildModel = {blessing: hero.blessing, rarity: 5, merges: 0, skills: {}, resplendent: false, ivs: {boon: IVS.neutral, bane: IVS.neutral}, dragonflowers: 0};
            this.selectedHeroes.push({...hero, ...{build: baseBuild, uid: short.generate()}});
        } else if(this.hasARExtra()){
            this.snackBar.open("Max of 7 heroes allowed", "Close", {duration: 2000});
        } else {
            this.snackBar.open("7th hero requires AR Extra mythic hero", "Close", {duration: 2000});
        }
    }

    hasARExtra(): boolean{
        for(let i = 0; i < this.selectedHeroes.length; i++){
            if(this.selectedHeroes[i].ar_extra === true && this.selectedHeroes[i].blessing === this.season){
                return true;
            }
        }
        return false;
    }

    removeHero(index: number){
        this.selectedHeroes.splice(index, 1);
    }

    close(){
        this.dialogRef.close();
    }
}