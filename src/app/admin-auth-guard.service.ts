
import {map} from 'rxjs/operators';

import { Observable} from 'rxjs';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService} from './user.service';





@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  AuthService: any;

  constructor(private auth:AuthService,private UserService:UserService) { }

  canActivate(): Observable<boolean> {
   
       return this.auth.appUser$.pipe(
    map((appUser :any) => appUser.isAdmin));
 }

}
