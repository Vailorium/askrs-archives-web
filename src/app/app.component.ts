import { HttpResponseBase } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ContributionsDialog } from './pages/contributions-dialog/contributions-dialog';
import { LoginDialog } from './pages/login-register-dialogs/login-dialog/login-dialog';
import { ReportBugDialog } from './pages/report-bug-dialog/report-bug-dialog';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Askrs Archives';

  version = "0.3";

  constructor(private dialog: MatDialog, public auth: AuthService){
    this.auth.loginByToken().subscribe((response: {message: string, role: string, username: string}) => {
      this.auth.role = response ? response.role : undefined;
      this.auth.username = response ? response.username : undefined;
    });
  }

  openReportBugDialog(){
    let reportBug = this.dialog.open(ReportBugDialog, {width: "450px"});

    reportBug.afterClosed().subscribe(() => {reportBug = null;});
  }

  openContributionsDialog(){
    let contributions = this.dialog.open(ContributionsDialog, {width: "450px"});

    contributions.afterClosed().subscribe(() => {contributions = null;}); 
  }

  openLoginDialog(){
    let login = this.dialog.open(LoginDialog, {minWidth: '350px'});

    login.afterClosed().subscribe(() => {login = null;});
  }

  openDiscordLink(){
    window.open("https://discord.gg/z9YSeEqzg4", "_blank");
  }

  logout(){
    this.auth.logout().subscribe((response: HttpResponseBase) => {
      console.log(response);
      if(response.status === 200){
        this.auth.role = undefined;
        this.auth.username = undefined;
      }
    });
  }

}
