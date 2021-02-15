import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/modals/User';
import { UserauthService } from 'src/app/services/userauth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  hide = true;
  User : FormGroup;  
  passtoken: string; 
  user:User;
  submitMessage: string;
  
  constructor(private userauth : UserauthService, private snack: MatSnackBar) { 
    this.User= new FormGroup({ 
      userId: new FormControl('',Validators.required),
      firstName : new FormControl('',Validators.required), 
      lastName : new FormControl('',Validators.required), 
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),  
      mobileNum : new FormControl('',Validators.maxLength(10)),  
      emailId: new FormControl('',[Validators.required, Validators.email]), 
    });
   
  }

  ngOnInit(): void {
    this.getUserDetails();  
  }

  updateUser() {
    let dat = this.User.value;
    console.log(dat);
      this.userauth.updateUserData(dat).subscribe(
      (res) => { 
        //console.log(res); 
        let msg = 'User Profile Updated Successfully';
        this.snack.open(msg,'OK',{duration:5000});
        this.getUserDetails();
      },
      (error) => { 
        //console.log(error.error); 
        let msg = error.error;
        this.snack.open(msg,'OK',{duration:5000});
      }
    ); 
  }
  
  reset() {
      this.User.reset();
  }
  
  getUserDetails() {
  let usrId=this.userauth.getUserId();
      this.userauth.getUserProfileData(usrId).subscribe(
        (res)=>{
          //console.log(res);
          this.user=res;
          this.User.patchValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            emailId: this.user.emailId,
            mobileNum: this.user.mobileNum,
            password: this.user.password,
            userId: this.user.userId
          });
        },
        (error) => { 
          //console.log(error.error); 
          let msg = error.error;
          this.snack.open(msg,'OK',{duration:5000});
        } 
      );
  }

}
