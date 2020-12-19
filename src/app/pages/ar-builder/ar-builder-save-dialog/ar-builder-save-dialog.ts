import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { ARTile, HeroInfoModel, SaveDataModel } from "src/app/models";
import { ARBuilderSaveConfirmDialog } from "./ar-builder-save-confirm-dialog/ar-builder-save-confirm-dialog";

@Component({
    selector: 'ar-builder-save-dialog',
    templateUrl: './ar-builder-save-dialog.html',
    styleUrls: ['./ar-builder-save-dialog.scss']
})
export class ARBuilderSaveDialog{

    @ViewChild("fileInput") fileInput;

    saveData: SaveDataModel[] = [];
    
    currentData: SaveDataModel;

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ARBuilderSaveDialog>, @Inject(MAT_DIALOG_DATA) data: SaveDataModel){
        this.dialogRef.afterClosed().subscribe(
            () => {
                this.dialogRef = null
            }
        );

        this.currentData = data;

        let loadData = JSON.parse(localStorage.getItem("ar-d-saves"));
        this.saveData = loadData ? loadData : [];
    }

    save(slot: number){
        if(this.saveData[slot]){
            let confirm = this.dialog.open(ARBuilderSaveConfirmDialog, {data: "overwrite"});
            confirm.afterClosed().subscribe(res => {
                if(res){
                    try{
                        this.saveData[slot] = {...this.currentData, timestamp: new Date().toJSON()};
                        localStorage.setItem('ar-d-saves', JSON.stringify(this.saveData));
                        this.snackBar.open(`Saved Sucessfully to Slot ${slot+1}`, "OK", {duration: 3000});
                    } catch {
                        this.snackBar.open("Error when trying to save", "OK", {duration: 3000});
                    }
                }
            });
        } else {
            try{
                this.saveData[slot] = {...this.currentData, timestamp: new Date().toJSON()};
                localStorage.setItem('ar-d-saves', JSON.stringify(this.saveData));
                this.snackBar.open(`Saved Sucessfully to Slot ${slot+1}`, "OK", {duration: 3000});
            } catch {
                this.snackBar.open("Error when trying to save", "OK", {duration: 3000});
            }
        }
    }

    loadFromFile(file){
        let reader = new FileReader();
        reader.onload = (event) => {
            try{
                let data = JSON.parse(event.target.result.toString());
                if(data.map && data.mapData && data.unitData && data.season){
                    this.snackBar.open("Loaded data from file", "OK", {duration: 3000});
                    this.close(data);
                }
                
            } catch(err) {
                if(err instanceof SyntaxError){
                    this.snackBar.open("Error when trying to load file: JSON parse error", "OK", {duration: 3000});
                } else {
                    this.snackBar.open("Error when trying to load file", "OK", {duration: 3000});
                }
            }
        }
        reader.readAsText(file.target.files[0]);
    }

    load(slot){
        if(this.saveData[slot]){
            this.snackBar.open(`Loaded data from slot ${slot + 1}`, "OK", {duration: 3000});
            this.close(this.saveData[slot]);
        } else {
            this.snackBar.open("Error when trying to load: Save Data does not Exist", "OK", {duration: 3000});
        }
    }

    delete(slot: number){
        let confirm = this.dialog.open(ARBuilderSaveConfirmDialog, {data: "delete"});

        confirm.afterClosed().subscribe((res) => {
            if(res){
                this.saveData[slot] = undefined;
                localStorage.setItem('ar-d-saves', JSON.stringify(this.saveData));
                this.snackBar.open(`Deleted data from slot ${slot + 1}`, "OK", {duration: 3000});
            }
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    close(data?: SaveDataModel): void {
        this.dialogRef.close(data);
    }
}