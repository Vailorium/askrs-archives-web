import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Dictionary } from 'src/app/models';

@Component({
    selector: 'ar-builder-terrain-dialog',
    templateUrl: './ar-builder-terrain-dialog.html',
    styleUrls: ['./ar-builder-terrain-dialog.scss']
})
export class ARBuilderTerrainDialog {

    mapDisplay: Dictionary<string> = {"springwater": "Springwater", "wintry": "Wintry", "abandoned_castle": "Abandoned Castle", "snowdust": "Snowdust", "desert": "Desert", "spring_breeze": "Spring Breeze", "leafy_canopy": "Leafy Canopy", "lost_castle": "Lost Castle", "bright_grassland": "Bright Grassland", "lava_floes": "Lava Floes"};
    currentlySelected: string = "desert";
    maps: string[] = ["springwater", "wintry", "abandoned_castle", "snowdust", "desert", "spring_breeze", "leafy_canopy", "lost_castle", "bright_grassland", "lava_floes"];
    constructor(public dialogRef: MatDialogRef<ARBuilderTerrainDialog>, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: string){
        this.currentlySelected = this.data;

        this.dialogRef.beforeClosed().subscribe( // overwrites default exiting behaviour - important if user clicks outside of dialog to close
            () => {
                this.dialogRef.close(this.currentlySelected);
            }
        );
    }

    setTerrain(map: string){
        this.currentlySelected = map;
    }

    onNoClick() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }
    
}