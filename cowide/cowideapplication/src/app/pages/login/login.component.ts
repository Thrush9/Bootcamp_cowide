import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserauthService } from '../../services/userauth.service';
import { RoutingserviceService } from '../../services/routingservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  User: FormGroup;  
  submitMessage: string;

  constructor(private routeobj:RoutingserviceService,private userauth : UserauthService,
              private snack: MatSnackBar) { 
    this.User= new FormGroup({ 
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),   
      emailId: new FormControl('',[Validators.required, Validators.email]),  
    })  
  }  
  
  ngOnInit(): void {  
    
  }
  
  submitLoginData() {
    console.log(this.User.value);
    let data = this.User.value;
    this.userauth.validateUser(data).subscribe(
      (res)=> {
        let tok = res["token"];
        let usrId=res["userId"];
        this.userauth.setBearertoken(tok);
        this.userauth.setUserId(usrId);
        let msg = 'SignIn Succesful';
        this.snack.open(msg,'OK',{duration:5000});
        this.routeobj.openLandingPage();
      },
      (err) => {
        if (err.status === 401) {
          this.submitMessage = err.error;
        } else {
            this.submitMessage = err.error.message;
        }
      }  
    );
  }

  reset() {
    this.User.reset();
  }
}

