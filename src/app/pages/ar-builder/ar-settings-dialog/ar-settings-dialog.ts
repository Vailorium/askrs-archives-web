import { Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ARSettingsModel } from "src/app/models";

@Component({
    selector: 'ar-settings-dialog',
    templateUrl: './ar-settings-dialog.html',
    styleUrls: ['./ar-settings-dialog.scss']
})
export class ARSettingsDialog {

    settings: FormGroup;

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ARSettingsDialog>, @Inject(MAT_DIALOG_DATA) public data: ARSettingsModel){
        this.settings = this.fb.group({
            grid: [data.grid],
            movement: [data.movement],
            weapon: [data.weapon]
        });
        
        this.dialogRef.beforeClosed().subscribe(() =>{
            this.dialogRef.close(this.settings.value);
        });
    }

    onNoClick() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }
    
}