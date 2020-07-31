import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { OrdersLayoutComponent } from './components/orders/orders-layout.component';
import { MyOrdersComponent } from './components/orders/my-orders/my-orders.component';
import { NewOrderComponent } from './components/orders/new-order/new-order.component';
import { OrderSuccessComponent } from './components/orders/order-success/order-success.component';

const routes: Routes = [  
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },     
  {
    path: 'orders',
    component: OrdersLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-orders',
        pathMatch: 'full'
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent
      },
      {
        path: 'new-order',
        component: NewOrderComponent
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent
      }      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
