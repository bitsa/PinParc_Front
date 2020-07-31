import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { Order } from '../order.model';
import { OrdersService } from '../orders.service';

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
    private service: OrdersService
  ) {

  }

  ngOnInit() {
    this.commonService.loadAppJs();
    var element = document.getElementById("containerr");
    element.classList.add("container--dark");
    
    // element = document.getElementById("maain");
    // element.removeAttribute("class");
    // element.classList.add("container--dark");
    
  }


  on_order(){
    this.service.postOrders(this.model);
    this.router.navigate(['./orders/order-success']);
  }


  getDistance() : number{
    return Math.floor(Math.random() * 100) + 1;
  }

}
