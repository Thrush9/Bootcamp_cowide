import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterationComponent } from './pages/registeration/registeration.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LandingpageGuard } from './services/landingpage.guard';
import { CountrysearchComponent } from './pages/countrysearch/countrysearch.component';
import { ContinentsearchComponent } from './pages/continentsearch/continentsearch.component';
import { DatesearchComponent } from './pages/datesearch/datesearch.component';
import { CasehistoryComponent } from './pages/casehistory/casehistory.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts'; 
import { RouterModule,Routes,Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';

const myRoutes : Routes = [
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path:'registeration',
    component:RegisterationComponent,
  },
  {
    path:'landingpage',
    component: LandingPageComponent,
    canActivate:[LandingpageGuard]
  },
  {
    path:'profile',
    component:UserProfileComponent,
    canActivate:[LandingpageGuard]
  },
  {
    path:'countrysearch',
    component:CountrysearchComponent,
    canActivate:[LandingpageGuard]
  },
  {
    path:'continentsearch',
    component:ContinentsearchComponent,
    canActivate:[LandingpageGuard]
  },
  {
    path:'datesearch',
    component:DatesearchComponent,
    canActivate:[LandingpageGuard]
  },
  {
    path:'casehistory',
    component:CasehistoryComponent,
    canActivate:[LandingpageGuard]
  },
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  }
 ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterationComponent,
    LandingPageComponent,
    UserProfileComponent,
    FooterComponent,
    CountrysearchComponent,
    ContinentsearchComponent,
    DatesearchComponent,
    CasehistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    RouterModule.forRoot(myRoutes)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
