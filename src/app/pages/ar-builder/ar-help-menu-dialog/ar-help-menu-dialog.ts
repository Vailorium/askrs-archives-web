import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

interface HelpArticle{
    title: string;
    content: string;
}
@Component({
    selector: 'ar-help-menu-dialog',
    templateUrl: './ar-help-menu-dialog.html',
    styleUrls: ['./ar-help-menu-dialog.scss']
})
export class ARHelpMenuDialog {

    public helpSections: HelpArticle[] = [
        {title: "Overview", content: "This menu contains information for how to use different features of this tool, and is not a guide on how to build your AR Defense.<br />Select an item on the left, or read them all. If there is something you need help with that isn't in this menu, feel free to join our discord server or report it as an issue (see issues page) if you think the information should be in this menu."},
        {title: "Heroes", content: "You can have a max of 7 heroes on Aether Raids Defense team, though only if you have a mythic hero with the AR Extra bonus (e.g. Seiros), otherwise you can only have a maximum of 6.<br />If you're trying to add a hero to the 7th slot but find that it isn't working, make sure that the current season is set to your AR Extra hero's appropriate season (e.g. Anima season for Seiros).<img src='assets/ui/test.png'>"},
        {title: "Structures", content: "TBD"},
        {title: "Seasons", content: "TBD"},
        {title: "Maps", content: "TBD"},
        {title: "Saving", content: "TBD"},
        {title: "Sharing", content: "TBD"},
        {title: "Issues", content: "TBD"}
    ];

    public selectedSection: HelpArticle = this.helpSections[0];

    constructor(public dialogRef: MatDialogRef<ARHelpMenuDialog>){

    }
    
    onNoClick() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }

    displayContent(){

    }
}