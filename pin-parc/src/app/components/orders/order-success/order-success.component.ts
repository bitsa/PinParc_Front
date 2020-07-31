import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';


@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderSuccessComponent implements OnInit {
  title = 'pin-parc';
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {

  }

  ngOnInit() {
    this.commonService.loadAppJs();
    
    setTimeout(() => {
      this.goBack();
    }, 2500);
    
  }

  goBack(){
    this.router.navigate(['./orders/my-orders']);
  }

}
