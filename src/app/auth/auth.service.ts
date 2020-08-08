import { Injectable } from '@angular/core';

import { HttpRequest, HttpClient } from '@angular/common/http';

@Injectable( {providedIn: 'root'})
export class AuthService {

 constructor(private http: HttpClient) {}

    public getToken() {
        return localStorage.getItem('token');
    }

    public setToken(token){
        return localStorage.setItem('token', token);
    }

    public removeToken(){
        return localStorage.removeItem('token');
    }

    public isAuthenticated(): boolean {
        // get the token
        const token = this.getToken();
        // return a boolean reflecting 
        // whether or not the token is expired
        // return tokenNotExpired(null, token);
        return true;
    }

    cachedRequests: Array<HttpRequest<any>> = [];

    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
        console.log("failed Request Collected", request);
    }

    public retryFailedRequests(): void {
        // retry the requests. this method can
        // be called after the token is refreshed
        console.log( "retry failed request");
    }

}