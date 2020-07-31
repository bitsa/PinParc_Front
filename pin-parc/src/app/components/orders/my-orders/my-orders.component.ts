import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { OrdersService } from '../orders.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyOrdersComponent implements OnInit {
  title = 'pin-parc';
  
  model: Order[] = new Array<Order>();
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private service: OrdersService
  ) {

  }

  ngOnInit() {
    this.commonService.loadAppJs();
    var element = document.getElementById("containerr");
    element.classList.remove("container--dark");

    this.getOrders();
  }


  getPrice() : number{
    return Math.floor(Math.random() * 50) + 1;
  }

  getOrders(){
   this.service.getOrders( this.onSuccess_getOrders.bind(this));
  }
  onSuccess_getOrders(data){
    this.model = Order.Parse(data);
    console.log(this.model);
  }
}
