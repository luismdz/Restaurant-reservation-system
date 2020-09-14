import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/auth', 'login']);
        }
      })
    );

  }

}
