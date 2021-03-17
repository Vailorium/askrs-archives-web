import { HttpResponse } from "@angular/common/http";
import { Component, Inject, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthService } from "src/app/services/auth-service";

@Component({
    selector: 'login-dialog',
    templateUrl: './login-dialog.html',
    styleUrls: ['./login-dialog.scss']
})
export class LoginDialog{

    loginForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<LoginDialog>, private fb: FormBuilder, public auth: AuthService){
        this.dialogRef.afterClosed().subscribe(
            () => {
                this.dialogRef = null
            }
        );

        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    getErrorMessage(control) {
        return this.loginForm.controls[control].hasError('required') ? 'You must enter a value' : '';
    }

    submit(){
        this.auth.login(this.loginForm.value['username'], this.loginForm.value['password']).subscribe((response: {message: string, role: string, username: string}) => {
            this.auth.role = response.role;
            this.auth.username = response.username;
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    close(): void {
        this.dialogRef.close();
    }
}