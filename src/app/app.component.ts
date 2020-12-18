import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ContributionsDialog } from './pages/contributions-dialog/contributions-dialog';
import { ReportBugDialog } from './pages/report-bug-dialog/report-bug-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Askr\'s Archives';

  version = "0.1";

  constructor(private dialog: MatDialog){ }

  openReportBugDialog(){
    let reportBug = this.dialog.open(ReportBugDialog, {height: "60%", width: "50%"});

    reportBug.afterClosed().subscribe(() => {reportBug = null;});
  }

  openContributionsDialog(){
    let contributions = this.dialog.open(ContributionsDialog, {height: "60%", width: "50%"});

    contributions.afterClosed().subscribe(() => {contributions = null;}); 
  }

}
