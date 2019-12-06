import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CustomerService } from './user.service';


@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(
    private userService: CustomerService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if (this.userService.userAuthenticate()) {
      return true;
    }

    this.router.navigate(['/login'])

    return false;
  }
}
