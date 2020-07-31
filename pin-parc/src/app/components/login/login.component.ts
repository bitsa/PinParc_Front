import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'pin-parc';
  returnUrl: string;
  public userName: string = '';
  public password: string = '';
  public eMail: string = '';


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private commonService: CommonService
    ) {

    // redirect if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/orders']);
    }

  }

  ngOnInit() {
    this.commonService.loadAppJs();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  loginClick() {
    console.log("loginClick");
    var loginStatus = this.authenticationService.login(this.userName, this.password, this.onSuccess_login.bind(this));
    this.router.navigate(["/orders"]);
  }

  registerClick(){
    console.log("registerClick");
    var registerStatus = this.authenticationService.register(this.userName, this.password, this.eMail, this.onSuccess_register.bind(this));
  }

  onSuccess_register(status: boolean){
    if (status) {
      console.log("success");
      this.router.navigate([""]);
    } else {
      alert("fail");
    }
  }

  onSuccess_login(status: boolean) {
    if (status) {
      console.log("success");
      this.router.navigate([this.returnUrl]);
    } else {
      console.log("fail");
    }

  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.loginClick();
    }
  }

}
