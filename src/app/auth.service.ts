
import {of as observableOf,  Observable ,  throwError } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
throwError('of');


import { AppUser } from './models/app-user';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  user$:Observable<firebase.User>

  constructor(
    private userService:UserService,
    private afAuth:AngularFireAuth, private route :ActivatedRoute ) { 

    this.user$=afAuth.authState;

  }



 login(){

  let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  localStorage.setItem('return',returnUrl);
  
  this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());


 } 

logout(){

this.afAuth.auth.signOut();

}

get appUser$() : Observable<AppUser>{

  return this.user$.pipe(
  switchMap(user =>{
      if (user)  return  this.userService.get(user.uid);
         
       return observableOf(null);

  }));
}

}
