import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ARTile, HeroInfoModel } from "src/app/models";

@Component({
    selector: 'ar-builder-save-confirm-dialog',
    templateUrl: './ar-builder-save-confirm-dialog.html',
    styleUrls: ['./ar-builder-save-confirm-dialog.scss']
})
export class ARBuilderSaveConfirmDialog{

    method: string;

    constructor(public dialogRef: MatDialogRef<ARBuilderSaveConfirmDialog>, @Inject(MAT_DIALOG_DATA) data: string){
        this.dialogRef.afterClosed().subscribe(
            () => {
                this.dialogRef = null
            }
        );

        this.method = data;
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    close(result: boolean): void {
        this.dialogRef.close(result);
    }
}