import { Component, OnInit } from '@angular/core';
import { RoutingserviceService } from '../../services/routingservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn = false;
  
  constructor(private routeobj : RoutingserviceService) { }

  ngOnInit(): void {
    this.loggedInCheck();
  }

  loggedInCheck() {
    if (sessionStorage.getItem('bearertoken') !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  
  showHome(){
    this.routeobj.openHome();
  }

  showSignin(){
    this.routeobj.openLogin();
  }
  
  showSignup(){
    this.routeobj.openRegisteration();
  }

  signOut() {
    sessionStorage.clear();
    location.reload();
    this.routeobj.openHome();;
  }
}
