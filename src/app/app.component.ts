import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ContributionsDialog } from './pages/contributions-dialog/contributions-dialog';
import { ReportBugDialog } from './pages/report-bug-dialog/report-bug-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Askrs Archives';

  version = "0.3.16";

  constructor(private dialog: MatDialog){
  }

  openReportBugDialog(){
    let reportBug = this.dialog.open(ReportBugDialog, {width: "450px"});

    reportBug.afterClosed().subscribe(() => {reportBug = null;});
  }

  openContributionsDialog(){
    let contributions = this.dialog.open(ContributionsDialog, {width: "450px"});

    contributions.afterClosed().subscribe(() => {contributions = null;}); 
  }

  openDiscordLink(){
    window.open("https://discord.gg/z9YSeEqzg4", "_blank");
  }

}
