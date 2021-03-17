import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

interface LoginResponse{
    message: string;
    token: string;
}
@Injectable({
    providedIn: 'root'
})
export class AuthService{

    role: string = undefined;
    username: string = undefined;
    constructor(private http: HttpClient){

    }

    public login(username: string, password: string){
        return this.http.post(`${environment.API_URL}/login`, {username, password}, {withCredentials: true});
    }

    public loginByToken(){
        return this.http.get(`${environment.API_URL}/login/token`, {withCredentials: true});
    }

    public logout(){
        return this.http.get(`${environment.API_URL}/logout`, {withCredentials: true, observe: "response"});
    }
}