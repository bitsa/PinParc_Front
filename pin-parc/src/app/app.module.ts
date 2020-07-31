import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {InputTextModule} from 'primeng/inputtext';


import { AuthService } from './shared/services/auth.service';
import { TokenStoreService } from './shared/services/tokenStore.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputTextModule
  ],
  providers: [
    AuthService,    
    TokenStoreService    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
