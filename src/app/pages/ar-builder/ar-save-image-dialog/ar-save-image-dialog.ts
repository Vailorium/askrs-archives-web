import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'ar-save-image-dialog',
    templateUrl: './ar-save-image-dialog.html',
    styleUrls: ['./ar-save-image-dialog.scss']
})
export class ARSaveImageDialog {

    constructor(public dialogRef: MatDialogRef<ARSaveImageDialog>, @Inject(MAT_DIALOG_DATA) public data: any){

    }

    onNoClick() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }
    
}