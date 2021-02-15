import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutingserviceService } from './routingservice.service';

@Injectable({
  providedIn: 'root'
})
export class LandingpageGuard implements CanActivate {

  constructor(private routeobj : RoutingserviceService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let flag  = sessionStorage.getItem("bearertoken");
      if(flag != null){
        return true;
      } else {
        this.routeobj.openLogin();
        return false;
      }
  }
  
}
