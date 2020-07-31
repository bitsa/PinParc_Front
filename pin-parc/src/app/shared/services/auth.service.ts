import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TokenStoreService } from './tokenStore.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, retry } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthService {

    private currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;

    constructor(
        private http: HttpClient,
        private tokenStoreService: TokenStoreService,
        private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<UserModel>(this.authUser);
        this.currentUser = this.currentUserSubject.asObservable();
        console.log("AuthService Ctor Called");
    }



    public get currentUserValue(): UserModel {
        return this.currentUserSubject.value;
    }

    login(userName: string, password: string, fnOnSuccess: Function) {

        this.tokenStoreService.deleteToken();

        var data = JSON.stringify(
            {
                "UserName": userName,
                "Password": password
            });

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        this.http.post(`admin/Token`, data, httpOptions).pipe(
            retry(1), // retry a failed request up to 1 times
        ).subscribe( // response
            (data: any) => {
                var eToken = data.token.substr(1).slice(0, -1);

                this.tokenStoreService.setToken(eToken);

                this.currentUserSubject.next(this.authUser);

                fnOnSuccess(true);
                //this.getUserInfo();                                        
            },
            er => {
                //this.logError(er);
                console.log(er);
                return false;
            });
    }

    logout(navigateToLogin: boolean = true) {

        //this.dialogRef.closeAll();

        this.tokenStoreService.deleteToken();
        this.currentUserSubject.next(null);
        //this.authStatusSource.next(false);

        if (navigateToLogin)
            this.router.navigate(["login"]);
    }

    isUserLoggedIn(): boolean {
        // if (this.tokenStoreService.getToken) {
        //     return true;
        // }
        // return false;

        return this.tokenStoreService.getToken ? true : false;

        // return this.tokenStoreService.hasStoredAccessAndRefreshTokens() &&
        //     (!this.tokenStoreService.isAuthTokenExpired(AuthTokenEnum.AccessToken) || !this.tokenStoreService.isAuthTokenExpired(AuthTokenEnum.RefreshToken));
    }

    get authUser(): UserModel {
        var eToken = this.tokenStoreService.getToken();
        //console.log(eToken);
        var decodedToken = this.tokenStoreService.decodeToken(eToken);
        if (!decodedToken) {
            return null;
        }
        let user: UserModel = UserModel.parseJson(decodedToken);
        return user;
    }


    // logError(ex: HttpErrorResponse) {
    //     let errorText = '';
    //     let isClientError = false;
    //     if (ex.error instanceof ErrorEvent) {
    //         // A client-side or network error occurred.
    //         errorText = ex.error.message;
    //         isClientError = true;
    //     } else {
    //         // The backend returned an unsuccessful response code.
    //         errorText = `Error code ${ex.status}, Error Message : ${ex.error.error}`;

    //         if (ex.status == 401) { // unauthorized
    //             localStorage.setItem('eToken', "");
    //         }
    //         else if (ex.status == 400) { // Bad Request

    //         }
    //         else if (ex.status == 500) { // Server Error
    //             // alert(ex.error.error_description)
    //             alert("დაფიქსირდა შეცდომა, გთხოვთ, სცადოთ მოგვიანებით.");
    //         }
    //         else if (ex.error.message !== undefined) { // Web Api Error
    //             errorText = `Error code ${ex.status}, Error Message : ${ex.error.message}, ErrorDescription : ${ex.error.messageDetail} `;
    //         }
    //     }

    //     if (![400, 401, 500].includes(ex.status) || isClientError) {
    //         //this.setAuthHeader()

    //         let req = {
    //             errorText: errorText
    //         }

    //         this.http.post(this.baseUrl + "api/Common/LogError", req, this.httpOptions).pipe(
    //             retry(0),
    //         ).subscribe((data: any) => { },
    //             er => { })
    //     }
    // }

}
