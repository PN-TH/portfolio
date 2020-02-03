import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * The user is considered connected if a token is stored.
   * Return true if connected else return false and redirect to the login page
   * @param next 
   * @param state 
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getToken()) {
      return true;
    }
    this.router.navigate(['/connectez-vous']);
    return false;
    
  }

  // isAdmin(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if(this.authService.getRole()){
  //     return true;
  //   }
  //   this.router.navigate(['/connectez-vous']);
  //   return false;
  // }
}
