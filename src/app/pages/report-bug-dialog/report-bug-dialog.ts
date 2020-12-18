import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
    selector: 'report-bug-dialog',
    templateUrl: './report-bug-dialog.html',
    styleUrls: ['./report-bug-dialog.scss']
})
export class ReportBugDialog{

    constructor(public dialogRef: MatDialogRef<ReportBugDialog>){
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