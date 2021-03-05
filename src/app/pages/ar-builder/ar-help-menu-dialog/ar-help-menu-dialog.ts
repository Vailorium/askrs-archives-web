import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ViewEncapsulation } from '@angular/core';

interface HelpArticle{
    title: string;
    content: string;
}
@Component({
    selector: 'ar-help-menu-dialog',
    templateUrl: './ar-help-menu-dialog.html',
    styleUrls: ['./ar-help-menu-dialog.scss']
    // encapsulation: ViewEncapsulation.None
})
export class ARHelpMenuDialog {

    public helpSections: HelpArticle[] = [
        {title: "Overview", content: "This menu contains information for how to use different features of this tool, and is not a guide on how to build your AR Defense.<br />Select an item on the left, or read them all. If there is something you need help with that isn't in this menu, feel free to join our discord server or report it as an issue (see issues page) if you think the information should be in this menu."},
        {title: "Heroes", content: "You can have a max of 7 heroes on Aether Raids Defense team, though only if you have a mythic hero with the AR Extra bonus (e.g. Seiros), otherwise you can only have a maximum of 6.<br /><br />If you're trying to add a hero to the 7th slot but find that it isn't working, make sure that the current season is set to your AR Extra hero's appropriate season (e.g. Anima season for Seiros).<br /><img src='assets/ui/test.png'><br />Units can be sorted using the sorters below the drop-down menu, the empty button the furthest to the left means 'No Filter' (i.e. all heroes shown).<br />When exiting the menu, if you have gaps in the middle of your hero selection (e.g. {1: Bernadetta, 2: empty, 3: Alfonse}) it will condense (e.g. {1: Bernadetta, 2: Alfonse}).<br /><br />Heroes can be swapped around slots by either clicking and dragging OR by tapping on the two you want to swap. They won't swap positions on the map, just in the menu and is generally only important for what units you want to display in what order in the \"Save Image\" menu and what hero in the 7th slot with AR Extra."},
        {title: "Structures", content: "Structures can be added and removed in the \"Edit Structures\" menu, there are some limitations to what structures you can add, such as the max count but also the rule that you can only have 1 'School' structure (e.g. Infantry School, Flying School) at a time."},
        {title: "Seasons", content: "Seasons can be adjusted using the season toggle button. Blessings for heroes on AR-D are automatically changed (unless they are a legendary/mythic) when this happens.<br />A common error that occurs with seasons is not having the correct season to add an AR-D Extra hero (e.g. Seiros) - if you can't add an AR-D Extra hero, make sure that you are in the correct season first."},
        {title: "Maps", content: "Maps can be changed using the map dropdown just above the season toggle. Structures/heroes will be automatically moved if they are placed on a tiles they can't be placed on when changing map."},
        {title: "Saving", content: "Currently the only way to save your defense is by using the Save/Load feature or the Export feature. You can have up to 9 saves in the Save/Load menu, this may be changed soon though."},
        {title: "Sharing", content: "Sharing can be done in multiple ways. First is using the \"Save Image\" feature to share an image of your build. There are a few options here that can be toggled. Preview is only available on desktop due to mobile being a pain to work with.<br />Second is the \"Share Link\" feature that allows you to share a direct link to your build - this feature is especially useful if you want feedback on a build from friends as it allows them to edit your build directly. This feature should work regardless of how old the link is."},
        {title: "Issues", content: "There are many bugs on this website that I am unaware of, and might be causing issues. Or I might've designed something dumb-ly and in an unintuitive manner, so if you're feeling a bit lost or something is wrong, feel free to join our discord server and chat about it."}
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