import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../models/user';
import * as Auth from '../actions/auth.actions';
import { AppState } from '../reducers';
import { AuthState } from '../reducers/auth.reducer';
import { filter, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(s => s.auth)
      .pipe(
        filter((auth: AuthState) => !auth.loading),
        take(1),
        map((auth: AuthState) => {
          if (!!auth.user.uid) {
            return true;
          } else {
            const redirect = next.url.map(segment => segment.path);
            this.store.dispatch(new Auth.NotAuthenticatedRedirect(redirect));
            return false;
          }
        })
      );
  }
}
