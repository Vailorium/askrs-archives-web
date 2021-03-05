import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HeroInfoModel } from 'src/app/models/HeroInfoModel';

@Component({
    selector: 'ar-edit-build-dialog',
    templateUrl: './ar-edit-build-dialog.html',
    styleUrls: ['./ar-edit-build-dialog.scss']
})
export class AREditBuildDialog {

    public settings: {heroEnabled: boolean, blessingEnabled: boolean, summonerSupportEnabled: boolean, allySupportEnabled: boolean} = {heroEnabled: false, blessingEnabled: false, summonerSupportEnabled: false, allySupportEnabled: false};

    constructor(public dialogRef: MatDialogRef<AREditBuildDialog>, @Inject(MAT_DIALOG_DATA) public data: HeroInfoModel){
        this.dialogRef.beforeClosed().subscribe( // overwrites default exiting behaviour - important if user clicks outside of dialog to close
            () => {
                console.log(this.data);
                this.dialogRef.close(this.data);
            }
        );
    }
    
    onNoClick() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }
    
}