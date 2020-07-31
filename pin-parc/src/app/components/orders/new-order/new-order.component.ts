import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { Order } from '../order.model';
import { OrdersService } from '../orders.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewOrderComponent implements OnInit {
  title = 'pin-parc';
  model: Order = new Order();
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private service: OrdersService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.commonService.loadAppJs();
    var element = document.getElementById("containerr");
    element.classList.add("container--dark");
    this.model.paymentMethodID = 2;
    this.model.deliveryTypeID = 2;    
    
  }


  on_order(){
    //this.model.deliveryTypeID = 1;
    //this.model.paymentMethodID = 1;
    this.model.userID = this.authService.authUser.UserID;
    this.service.postOrders(this.model);
    this.router.navigate(['./orders/order-success']);
  }

  setPayment(id:number){
    this.model.paymentMethodID = id;
  }

  setDelivery(id:number){
    this.model.deliveryTypeID = id;
  }

  getDistance() : number{
    return Math.floor(Math.random() * 100) + 1;
  }

}
