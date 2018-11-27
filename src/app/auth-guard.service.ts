
import {map} from 'rxjs/operators';
import {Router, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router )  { }

      canActivate(route,state:RouterStateSnapshot) {

  return this.auth.user$.pipe(map(user => {
     if(user) return true;

     this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
     return false;

  }));


   } 


 

}
