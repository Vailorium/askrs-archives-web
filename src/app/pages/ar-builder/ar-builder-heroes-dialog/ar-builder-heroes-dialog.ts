import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { Blessing, HeroDataModel, HeroTableModel, IVS } from 'src/app/models';
import { ARBuildModel } from 'src/app/models/ar-d/ARBuildModel';
import { HeroInfoModel } from 'src/app/models/HeroInfoModel';
import { UnitFinderService } from 'src/app/services/unit-finder.service';
const short = require('short-uuid');

@Component({
    selector: 'ar-builder-heroes-dialog',
    templateUrl: './ar-builder-heroes-dialog.html',
    styleUrls: ['./ar-builder-heroes-dialog.scss']
})
export class ARBuilderHeroesDialog {

    // heroList: HeroDataModel[][];
    baseList: HeroDataModel[];
    filteredList: HeroDataModel[];
    // unfilteredList: HeroDataModel[];

    heroFilter: FormGroup;
    season: number;
    pageNumber: number = 0;

    hero: FormControl = new FormControl();
    hero_name_filter: FormControl = new FormControl();

    hero_select: FormGroup;

    selectedHeroes: HeroInfoModel[] = new Array(7);

    blessingEnum = Blessing;
    
    constructor(public dialogRef: MatDialogRef<ARBuilderHeroesDialog>, private heroes: UnitFinderService, private fb: FormBuilder, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: {units: HeroInfoModel[], season: number}){
        this.selectedHeroes = data.units.concat(new Array(7 - data.units.length));
        this.season = data.season;

        this.baseList = Object.assign([], this.heroes.getHeroList()).sort((a, b) => {
            if(a.image < b.image){
                return -1
            } else {
                return 1;
            }
        });
        this.filteredList = Object.assign([], this.baseList);

        this.heroFilter = this.fb.group({
            blessing: ['0']
        });

        this.hero_select = this.fb.group({
            hero: ['']
        });

        this.hero_select.valueChanges.subscribe((val) => {
            this.addHero(this.heroes.getHeroById(val.hero));

            this.hero_select.patchValue({hero: ''}, {emitEvent: false});
        });

        this.dialogRef.beforeClosed().subscribe( // overwrites default exiting behaviour - important if user clicks outside of dialog to close
            () => {
                console.log(this.selectedHeroes.filter(a => a !== undefined));
                this.dialogRef.close(this.selectedHeroes.filter(a => a !== undefined));
            }
        );
    }

    changePage(ev: PageEvent){
        this.pageNumber = ev.pageIndex;
    }

    
    addHero(hero: HeroDataModel){
        let baseBuild: ARBuildModel = {blessing: hero.blessing, rarity: 5, merges: 0, skills: {}, resplendent: false, ivs: {boon: IVS.neutral, bane: IVS.neutral}, dragonflowers: 0};
        let heroData: HeroInfoModel = {...hero, ...{build: baseBuild, uid: short.generate()}};

        let max = this.hasARExtra() || (hero.ar_extra === true && hero.blessing === this.season) ? 7 : 6;
        
        for(let i = 0; i < max; i++){
            if(this.selectedHeroes[i] === undefined){
                this.selectedHeroes[i] = heroData;
                return;
            }
        }

        if(this.hasARExtra()){
            this.snackBar.open("Max of 7 heroes allowed", "Close", {duration: 2000});
        } else {
            this.snackBar.open("7th hero requires AR Extra mythic hero", "Close", {duration: 2000});
        }

    }

    updateFilter(){
        let val = parseInt(this.heroFilter.value['blessing']);
        if(val === 2 || val === 3){
            this.filteredList = this.baseList.filter(a => a.special_kind === val);
        } else if(val === 6 || val === 8){
            this.filteredList = this.baseList.filter(a => a.blessing === val);
        } else {
            this.filteredList = this.baseList;
        }
        console.log(this.filteredList);
    }

    hasARExtra(): boolean{
        for(let i = 0; i < this.selectedHeroes.length; i++){
            if(this.selectedHeroes[i] !== undefined){
                if(this.selectedHeroes[i].ar_extra === true && this.selectedHeroes[i].blessing === this.season){
                    return true;
                }    
            }
        }
        return false;
    }

    close(){
        this.dialogRef.close();
    }

    drop(event: CdkDragDrop<HeroInfoModel[]>){
        if(event.currentIndex === 6 && !this.hasARExtra()){
            return;
        }
        let temp = this.selectedHeroes[event.currentIndex];
        this.selectedHeroes[event.currentIndex] = this.selectedHeroes[event.previousIndex];
        this.selectedHeroes[event.previousIndex] = temp;
        this.selectedIndex = undefined;
        // moveItemInArray(this.selectedHeroes, event.previousIndex, event.currentIndex);
    }

    selectedIndex?: number = undefined;
    select(e: MouseEvent, i: number){
        if(i === 6 && !this.hasARExtra()){
            return;
        }
        if(this.selectedIndex === undefined){
            this.selectedIndex = i;
        } else {
            let temp = this.selectedHeroes[this.selectedIndex];
            this.selectedHeroes[this.selectedIndex] = this.selectedHeroes[i];
            this.selectedHeroes[i] = temp;
            this.selectedIndex = undefined;
        }
        e.stopImmediatePropagation();
    }

    unselect(){
        this.selectedIndex = undefined;
    }

    remove(e: MouseEvent, i: number){
        this.selectedHeroes[i] = undefined;
        if(!this.hasARExtra() && this.selectedHeroes[6] !== undefined){
            this.selectedHeroes[i] = this.selectedHeroes[6];
            this.selectedHeroes[6] = undefined;
            this.snackBar.open("AR Extra hero removed - add AR Extra hero to regain extra slot", "Close", {duration: 2000});
        }
        this.selectedIndex = undefined;
        e.stopImmediatePropagation();
    }
}