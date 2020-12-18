import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
    selector: 'contributions-dialog',
    templateUrl: './contributions-dialog.html',
    styleUrls: ['./contributions-dialog.scss']
})
export class ContributionsDialog{

    constructor(public dialogRef: MatDialogRef<ContributionsDialog>){
        this.dialogRef.afterClosed().subscribe(
            () => {
                this.dialogRef = null
            }
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    close(): void {
        this.dialogRef.close();
    }
}