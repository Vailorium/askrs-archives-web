import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { SaveDataModel } from 'src/app/models';
import { HeroInfoModel } from 'src/app/models/HeroInfoModel';
import { ARDService } from 'src/app/services/ar-d.service';

@Component({
    selector: 'ar-url-share-dialog',
    templateUrl: './ar-url-share-dialog.html',
    styleUrls: ['./ar-url-share-dialog.scss']
})
export class ARURLShareDialog {

    link: string = "";

    @ViewChild('copy') copy: ElementRef<HTMLInputElement>;

    constructor(public dialogRef: MatDialogRef<ARURLShareDialog>, private ard: ARDService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) data: SaveDataModel){
        this.link = window.location.origin + "/ar-builder?data=" + this.ard.getLink(data.map, data.mapData, data.unitData, data.season);
    }
    
    copyLink(){
        this.copy.nativeElement.select();
        this.copy.nativeElement.setSelectionRange(0, 999);
        document.execCommand("copy");

        this.snackbar.open("Copied!", "", {duration: 3000});
    }

    onNoClick() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }
    
}