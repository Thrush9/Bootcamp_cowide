import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingserviceService {
  constructor(private routeobj:Router) { }
  
  openHome()
  {
    this.routeobj.navigate(['home']);
  }
  
  openLogin()
  {
    this.routeobj.navigate(['login']);
  }
  
  openRegisteration()
  {
    this.routeobj.navigate(['registeration']);
  }
  
  openLandingPage()
  {
    this.routeobj.navigate(['landingpage']);
  }

  openProfile()
  {
    this.routeobj.navigate(['profile']);
  }

  openContinentSearch()
  {
    this.routeobj.navigate(['continentsearch']);
  }

  openCountrySearch()
  {
    this.routeobj.navigate(['countrysearch']);
  }

  openDateSearch()
  {
    this.routeobj.navigate(['datesearch']);
  }

  openCaseHistory()
  {
    this.routeobj.navigate(['casehistory']);
  }
}
