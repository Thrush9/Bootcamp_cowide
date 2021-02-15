import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { WorldCount } from '../modals/WorldCount';
import { UserauthService } from '../services/userauth.service';

import { Observable } from 'rxjs';
import { RegionCount } from '../modals/RegionCount';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private httpclient : HttpClient, private userService: UserauthService) { }


  saveWorldCounts(counts: WorldCount){
   const token = this.userService.getBearertoken();
   return this.httpclient.post<WorldCount>("http://localhost:8765/WorldDataService/cowide/worldData/saveCounts",counts,
   {
     headers : new HttpHeaders().set('Authorization',`Bearer ${token}`)
   });
  }

  saveRegionCounts(counts: RegionCount){
    const token = this.userService.getBearertoken();
    return this.httpclient.post<WorldCount>("http://localhost:8765/RegionDataService/cowide/regionData/saveCounts",counts,
    {
      headers: new HttpHeaders().set('Authorization',`Bearer ${token}`)
    }
    );
   }

  getAllWorldCountsByUserId(userId : string) : Observable<WorldCount[]>
  {
    let tok = this.userService.getBearertoken();
    let usrId = parseInt(userId);
         return this.httpclient.get<WorldCount[]>(`http://localhost:8765/WorldDataService/cowide/worldData/getAllCounts?userId=${usrId}`,
    {
      headers: new HttpHeaders().set('Authorization',`Bearer ${tok}`)  
    });   
  }


  getAllWorldCountsByIdAndDate(userId:string,date:string) {
    let tok=this.userService.getBearertoken();
    let usrId = parseInt(userId);
    return this.httpclient.get<WorldCount[]>(`http://localhost:8765/WorldDataService/cowide/worldData/getCounts?userId=${usrId}&date=${date}`,{
    headers: new HttpHeaders().set('Authorization',`Bearer ${tok}`)  
  });
  }

  getAllRegionCountsByUserId(userId : string) : Observable<RegionCount[]>
  {
    let tok = this.userService.getBearertoken();
    let usrId = parseInt(userId);
         return this.httpclient.get<RegionCount[]>(`http://localhost:8765/RegionDataService/cowide/regionData/getAllCounts?userId=${usrId}`,
    {
      headers: new HttpHeaders().set('Authorization',`Bearer ${tok}`)  
    }); 
  }

  getAllRegionCountsByIdDateAndType(userId:string,date:string,name:string){
    let tok = this.userService.getBearertoken();
    let usrId = parseInt(userId);
    return this.httpclient.get<WorldCount[]>(`http://localhost:8765/RegionDataService/cowide/regionData/getCounts?userId=${usrId}&date=${date}&name=${name}`,{
    headers: new HttpHeaders().set('Authorization',`Bearer ${tok}`)  
  });
  }

  deleteWorldCount(userId:string,date:string,type:string) {
    let tok = this.userService.getBearertoken();
    let usrId = parseInt(userId);
    return this.httpclient.delete(`http://localhost:8765/WorldDataService/cowide/worldData/deleteCounts?userId=${usrId}&date=${date}&type=${type}`,
    {
      headers: new HttpHeaders().set('Authorization',`Bearer ${tok}`)  
    }); 
  }

  deleteRegionCount(userId:string,date:string,name:string) {
    let tok = this.userService.getBearertoken();
    let usrId = parseInt(userId);
    return this.httpclient.delete(`http://localhost:8765/RegionDataService/cowide/regionData/deleteCounts?userId=${usrId}&date=${date}&name=${name}`,
    {
      headers: new HttpHeaders().set('Authorization',`Bearer ${tok}`)  
    }); 
  }

}
