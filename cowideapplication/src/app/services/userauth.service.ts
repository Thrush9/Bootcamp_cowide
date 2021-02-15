import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modals/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  constructor(private httpCli: HttpClient) {
   }

   addUserData(data : User) :Observable<any>
   {
     return this.httpCli.post('http://localhost:9096/cowide/user/addUser',data,{reportProgress:true,responseType:'text'});
   }

   updateUserData(data : User) :Observable<any>
   {
     let tok = this.getBearertoken();
     return this.httpCli.post('http://localhost:8765/UserAuthenticationService/cowide/user/updateUser',data,
     {
      reportProgress:true,
      responseType:'text',
      headers: new HttpHeaders().set('Authorization',`Bearer ${tok}`)
    });
   }

   validateUser(valUser : User) 
   {
     return this.httpCli.post('http://localhost:9096/cowide/user/login',valUser);
   }

   setBearertoken(tok) {
     sessionStorage.setItem('bearertoken',tok);
   }

   getBearertoken() : string
   {
      return sessionStorage.getItem('bearertoken');
   }

   getUserId() {
    return sessionStorage.getItem('userId');
  }

  setUserId(userId) {
    return sessionStorage.setItem('userId',userId);
  }
  getUserProfileData(userId : string) : Observable<User>
  {
    let tok = this.getBearertoken();
    let usrId = parseInt(userId);
         return this.httpCli.get<User>(`http://localhost:8765/UserAuthenticationService/cowide/user/getUserProfileDetails/${usrId}`,
    {
      headers: new HttpHeaders().set('Authorization',`Bearer ${tok}`)  
    });
  }
}
