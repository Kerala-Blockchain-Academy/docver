import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServices } from './auth.service';
import { httpFactory } from '@angular/http/src/http_module';
import { SawtoothService } from './sawtooth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  // path;
  // route;


  constructor(private authService: SawtoothService, private router: Router) {

   }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     if (this.authService.logger()) {
       return true;
     } else {
       this.router.navigate(['login']);
     }
   }
}
