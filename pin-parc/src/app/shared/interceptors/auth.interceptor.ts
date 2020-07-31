import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { TokenStoreService } from '../services/tokenStore.service';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenStoreService: TokenStoreService, private authService: AuthService) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const accessToken = this.tokenStoreService.getToken();        
        
            //თუ საჭიროება იქნა ეს გაიტანე ცალკე
            request = request.clone({
                headers: request.headers.set("Content-Type", 'application/json')
            });
        

        if (accessToken) {
            request = request.clone({
                headers: request.headers.set("Authorization", `Bearer ${accessToken}`)
            });
        }

        return next.handle(request).pipe(
            catchError((error: any, caught: Observable<HttpEvent<any>>) => {
                if (error.status === 401 || error.status === 403) {
                    this.authService.logout();
                }
                return throwError(error);
            })
        );
    }

}
