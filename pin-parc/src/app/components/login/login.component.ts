import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

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



  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) {

    // redirect if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/customer']);
    }

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'customer';
  }

  loginClick() {
    var loginStatus = this.authenticationService.login(this.userName, this.password, this.onSuccess_login.bind(this));
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
