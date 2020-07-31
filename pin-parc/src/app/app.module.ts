import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule } from 'primeng/inputtext';


import { AuthService } from './shared/services/auth.service';
import { CommonService } from './shared/services/common.service';
import { TokenStoreService } from './shared/services/tokenStore.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ApiBaseUrlInterceptor } from './shared/interceptors/apiBaseUrl.interceptor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { OrdersLayoutComponent } from './components/orders/orders-layout.component';
import { MyOrdersComponent } from './components/orders/my-orders/my-orders.component';
import { MenuComponent } from './components/orders/menu/menu.component';
import { NewOrderComponent } from './components/orders/new-order/new-order.component';
import { OrderSuccessComponent } from './components/orders/order-success/order-success.component';
import { OrdersService } from './components/orders/orders.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersLayoutComponent,
    MyOrdersComponent,
    NewOrderComponent,
    MenuComponent,
    OrderSuccessComponent
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    InputTextModule
  ],
  providers: [
    AuthService,
    TokenStoreService,
    CommonService,
    OrdersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiBaseUrlInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
