import { AngularFireAuthModule } from '@angular/fire';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { AdpostComponent } from './pages/adpost/adpost.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from "@angular/fire/auth-guard"


const redirectUnauthorizedTologin = () =>redirectUnauthorizedTo(['signin'])
const redirectLoggedInToHome = () => redirectLoggedInTo([''])

const routes: Routes = [
  {
    path: 'signin',
    component:SigninComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redirectLoggedInToHome}
  },
  {
    path: 'signup',
    component:SigninComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redirectLoggedInToHome}
  },
  {
    path: 'addpost',
    component:AdpostComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redirectUnauthorizedTologin}
  },
  {
    path: 'Homecomponent',
    component:SigninComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authguardpipe: redirectLoggedInToHome}
  },
  {
    path: "*",
    component:PagenotfoundComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
