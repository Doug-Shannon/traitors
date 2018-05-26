import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { Observable, from as ObservableFrom, of as ObservableOf } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { User, Player } from '../models';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FirestoreAuthService } from '../services/firestore-auth-service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private fsAuth: FirestoreAuthService, private router: Router) {}

  @Effect()
  getUser: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.GET_USER).pipe(
    this.fsAuth.getAuthStatus,

    map(a => {
      if (a) {
        /// User logged in
        return new AuthActions.Authenticated(new User({ uid: a.uid }));
      } else {
        /// User not logged in
        return new AuthActions.NotAuthenticated();
      }
    }),

    catchError(err => ObservableOf(new AuthActions.Error(err)))
  );

  @Effect()
  userAuthenticated: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.AUTHENTICATED).pipe(
    this.fsAuth.getLoggedinPlayer,

    map(player => new AuthActions.GetPlayerSuccess(player)),

    catchError(err => ObservableOf(new AuthActions.Error(err)))
  );

  @Effect()
  logout: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.LOGOUT).pipe(
    this.fsAuth.signOut,

    map(() => {
      this.router.navigate(['']);
      return { type: 'NO_ACTION' };
    }),

    catchError(err => ObservableOf(new AuthActions.Error(err)))
  );

  @Effect()
  login: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.LOGIN).pipe(
    this.fsAuth.signIn,

    map(c => new AuthActions.GetUser()),

    catchError(err => ObservableOf(new AuthActions.Error(err)))
  );

  @Effect()
  redirectToLogin: Observable<Action> = this.actions$
    .ofType(AuthActions.AuthActionTypes.NOT_AUTHENTICATED_REDIRECT)
    .pipe(
      map(payload => {
        this.router.navigate(['login']);
        return { type: 'NO_ACTION' };
      })
    );
}
