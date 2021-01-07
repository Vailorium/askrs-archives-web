import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ARSettingsModel } from "src/app/models";

@Component({
    selector: 'ar-settings-dialog',
    templateUrl: './ar-settings-dialog.html',
    styleUrls: ['./ar-settings-dialog.scss']
})
export class ARSettingsDialog {

    constructor(public dialogRef: MatDialogRef<ARSettingsDialog>, @Inject(MAT_DIALOG_DATA) public data: ARSettingsModel){
        this.dialogRef.afterClosed().subscribe(() =>{
            this.dialogRef.close("hi");
        });
    }

    onNoClick() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }
    
}