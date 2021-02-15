import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserauthService } from '../../services/userauth.service';
import { RoutingserviceService } from '../../services/routingservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {
  hide = true;
  User : FormGroup;   
  submitMessage: string;

  constructor(private routeobj:RoutingserviceService,private userauth : UserauthService,
    private snack: MatSnackBar) { 
    this.User= new FormGroup({ 
      //userId: new FormControl('',Validators.required),
      firstName : new FormControl('',Validators.required), 
      lastName : new FormControl('',Validators.required), 
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),  
      mobileNum : new FormControl('',Validators.maxLength(10)),  
      emailId: new FormControl('',[Validators.required, Validators.email]),  
    })  
  }  
  ngOnInit(): void {  }

  storeUser() {
    let data = this.User.value;
    this.userauth.addUserData(data).subscribe(
      (res) => {
        let msg1 = 'Registration Succesful, SignIn using credentials';
        this.snack.open(msg1,'OK',{duration:5000});
        this.routeobj.openLogin();       
    },
     (err) => {
        this.submitMessage = err.error;
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