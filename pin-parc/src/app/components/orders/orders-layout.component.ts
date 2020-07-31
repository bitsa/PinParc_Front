import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-orders-layout',
  templateUrl: './orders-layout.component.html',
  styleUrls: ['./orders-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersLayoutComponent implements OnInit {
  title = 'pin-parc';
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
    ) {

    

  }

  ngOnInit() {
    
  } 

  

}
