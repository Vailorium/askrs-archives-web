import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SkillModel } from 'src/app/models';
import { UnitFinderService } from 'src/app/services/unit-finder.service';

@Component({
    selector: 'skill-info-dialog',
    templateUrl: './skill-info-dialog.html',
    styleUrls: ['./skill-info-dialog.scss']
})
export class SkillInfoDialog{

    fodderAt = [];

    constructor(public dialogRef: MatDialogRef<SkillInfoDialog>, @Inject(MAT_DIALOG_DATA) public data: SkillModel, public unitFinder: UnitFinderService){
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

    public displaySkill(skill): string {
        return JSON.stringify(skill);
    }
}