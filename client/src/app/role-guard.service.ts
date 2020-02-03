import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable()

export class RoleGuardService implements CanActivate {
  
    constructor(public authService: AuthService, public router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
   
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    if (!token) {
        this.router.navigate(['connectez-vous'])
        return false}
    const tokenPayload = decode(token);

    if (
    !this.authService.getToken() || 
    tokenPayload.role !== expectedRole
    ) {
    this.router.navigate(['connectez-vous']);
    return false;
    }
    return true;
  }
}