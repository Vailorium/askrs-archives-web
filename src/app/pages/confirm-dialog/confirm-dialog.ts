import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.html',
    styleUrls: ['./confirm-dialog.scss']
})
export class ConfirmDialog{

    title: string;
    message: string;

    buttons: {display: string, value: any}[];

    default: any;

    constructor(public dialogRef: MatDialogRef<ConfirmDialog>, @Inject(MAT_DIALOG_DATA) data: {title: string, default?: any, message: string, options: {display: string, color: "primary" | "accent" | "warn" | "", value: any}[]}){
        this.dialogRef.afterClosed().subscribe(
            () => {
                this.dialogRef = null
            }
        );
        this.title = data.title;
        this.message = data.message;
        this.buttons = data.options;
        this.default = data.default ? data.default : false;
    }

    onNoClick(): void {
        this.dialogRef.close(this.default);
    }

    close(result: boolean): void {
        this.dialogRef.close(result);
    }
}