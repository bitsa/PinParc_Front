import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class OrdersService { 


    constructor(private http: HttpClient, private router: Router) {

    }

    public getOrders(fnOnSuccess: Function) {
        this.http.get<any>(`orders/GetOrders`).subscribe( // response
          (data: any) => {    
            
            fnOnSuccess(data);
          },
          er => {            
            alert("დაფიქსირდა შეცდომა ! " + er.toString());
          });
      }

     public postOrders(model:any){
        this.http.post(`orders/postOrders`, model).subscribe( // response
            (data: any) => {    
                            
            },
            er => {              
              console.log("დაფიქსირდა შეცდომა ! " + er.toString());
            });
     }

}