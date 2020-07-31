import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  title = 'pin-parc';

  constructor(private router: Router,
    private authenticationService: AuthService
  ) {

  }

  ngOnInit() {

  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
