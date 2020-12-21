import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ARTile } from 'src/app/models';

@Component({
    selector: 'ar-builder-structures-dialog',
    templateUrl: './ar-builder-structures-dialog.html',
    styleUrls: ['./ar-builder-structures-dialog.scss']
})
export class ARBuilderStructuresDialog {

    public buildings: ARTile[] = [{image: "aether_amphorae", display: "Aether Amphorae", folder: "aether_raids", type: "other", permanent: false, selected: true, isSchool: false}, {image: "aether_fountain", display: "Aether Fountain", folder: "aether_raids", type: "other", permanent: false, selected: true, isSchool: false}, {image: "armor_school", display: "Armor School", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: true}, {image: "bolt_tower", display: "Bolt Tower", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "bright_shrine", display: "Bright Shrine", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false},{image: "catapult", display: "Catapult", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "cavalry_school", display: "Cavalry School", folder: "aether_raids", type:"building", permanent: false, selected: false, isSchool: true}, {image: "dark_shrine", display: "Dark Shrine", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "duos_hindrance", display: "Duo's Hindrance", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "flier_school", display: "Flier School", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: true}, {image: "fortress", display: "Fortress", folder: "aether_raids", type: "other", permanent: false, selected: true, isSchool: false}, {image: "healing_tower", display: "Healing Tower", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "infantry_school", display: "Infantry School", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: true}, {image: "panic_manor", display: "Panic Manor", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}, {image: "tactics_room", display: "Tactics Room", folder: "aether_raids", type: "building", permanent: false, selected: false, isSchool: false}];
    public buildingCount: number = 1;
    public schoolSelected: boolean = false;

    public traps: ARTile[] = [{image: "bolt_trap", display: "Bolt Trap", folder: "aether_raids", type: "trap", permanent: false, isSchool: false}, {image: "fake_bolt_trap", display: "Fake Bolt Trap", folder: "aether_raids", type: "trap", permanent: false, isSchool: false}, {image: "heavy_trap", display: "Heavy Trap", folder: "aether_raids", type: "trap", permanent: false, isSchool: false}, {image: "fake_heavy_trap", display: "Fake Heavy Trap", folder: "aether_raids", type: "trap", permanent: false, isSchool: false}];

    public decorations: ARTile[] = [{image: 'dining_hall', display: "Dining Hall", folder: "aether_raids", type:"decoration", permanent: false, isSchool: false}, {image: 'field', display: "Field", folder: "aether_raids", type:"decoration", permanent: false, isSchool: false}, {image: 'hot_spring', display: "Hot Spring", folder: "aether_raids", type:"decoration", permanent: false, isSchool: false}, {image: 'inn', display: "Inn", folder: "aether_raids", type:"decoration", permanent: false, isSchool: false}];
    public decorationCount: number = 0;

    constructor(public dialogRef: MatDialogRef<ARBuilderStructuresDialog>, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: string[]){
        this.dialogRef.beforeClosed().subscribe( // overwrites default exiting behaviour - important if user clicks outside of dialog to close
            () => {
                let ret = this.buildings.filter(a => a.selected).concat(this.traps.filter(b => b.selected).concat(this.decorations.filter(c => c.selected))); // quick and dirty
                this.dialogRef.close(ret);
            }
        );
        
        for(let i = 0; i < this.buildings.length; i++){
            if(data.includes(this.buildings[i].image) && this.buildings[i].type !== "other"){
                this.buildings[i].selected = true;
                this.buildingCount += 1;
                if(this.buildings[i].isSchool){
                    this.schoolSelected = true;
                }
            }
        }

        for(let i = 0; i < this.traps.length; i++){
            if(data.includes(this.traps[i].image)){
                this.traps[i].selected = true;
            }
        }

        for(let i = 0; i < this.decorations.length; i++){
            if(data.includes(this.decorations[i].image)){
                this.decorations[i].selected = true;
                this.decorationCount += 1;
            }
        }
    }

    selectBuilding = (index: number) => {
        let building = this.buildings[index];
        if(building.selected){
            if(building.type !== "other"){
                this.buildings[index].selected = false;
                this.buildingCount--;
                if(building.isSchool){
                    this.schoolSelected = false;
                }
            } else {
                this.snackBar.open("Fortress, Aether Fountain and Aether Amphorae cannot be unselected", "Close", {duration: 2000});
            }
        } else {
            if(this.buildingCount < 6){
                if(building.isSchool){
                    if(!this.schoolSelected){
                        this.buildings[index].selected = true;
                        this.buildingCount++;
                        this.schoolSelected = true;
                    } else {
                        this.snackBar.open("Only 1 school can be on the field at a time", "Close", {duration: 2000});
                    }
                } else {
                    this.buildings[index].selected = true;
                    this.buildingCount++;
                }
            } else {
                this.snackBar.open("Max of 5 buildings (+Fortress, Fountain and Amphorae) allowed", "Close", {duration: 2000});
            }
        }
    }

    selectTrap = (index: number) => {
        this.traps[index].selected = !this.traps[index].selected;
    }

    selectDecoration = (index: number) => {
        let decoration = this.decorations[index];
        if(decoration.selected){
            this.decorations[index].selected = false;
            this.decorationCount--;
        } else {
            if(this.decorationCount < 4){
                this.decorations[index].selected = true;
                this.decorationCount++;
            } else {
                this.snackBar.open("Max of 4 decorations allowed", "Close", {duration: 2000});
            }
        }
    }

    getCount(structureType: string){
        switch(structureType){
            case "buildings":
                return this.buildings.filter(a => a.selected).length;
            case "traps":
                return this.traps.filter(a => a.selected).length;
            case "decorations":
                return this.decorations.filter(a => a.selected).length;
        }
        return 0;
    }

    onNoClick() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }
    
}