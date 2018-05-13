import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { Observable, from as ObservableFrom, of as ObservableOf } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { User, Player } from '../models';
import { switchMap, map, catchError, tap, take, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppState } from '../reducers';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private fbAuth: AngularFireAuth,
    private firestoredb: AngularFirestore,
    private store: Store<AppState>,
    private router: Router) { }

  @Effect()
  getUser: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.GET_USER)
    .pipe(
      switchMap(payload => this.fbAuth.authState),
      map(authData => {
        if (authData) {
          /// User logged in
          const user = new User(authData.uid);
          return new AuthActions.UserAuthenticated(user);
        } else {
          /// User not logged in
          return new AuthActions.UserNotAuthenticated();
        }
      }),
      catchError((err) => ObservableOf(new AuthActions.AuthError(err)))
    );

  @Effect()
  userAuthenticated: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.USER_AUTHENTICATED).pipe(
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, state]) => {
      return this.firestoredb.collection('players').doc(state.user.uid).snapshotChanges();
    }),
    map(a => {
      const response = a.payload.data() as Player;
      response.id = a.payload.id;
      return response;
    }),
    map((player: Player) => {
      return new AuthActions.GetPlayerSuccess(player);
    }),
    catchError((err) => ObservableOf(new AuthActions.AuthError(err)))
  );

  @Effect()
  logout: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.LOGOUT)
    .pipe(
      switchMap(payload => {
        return ObservableFrom(this.fbAuth.auth.signOut());
      }),
      map(authData => {
        this.router.navigate(['']);
        return { type: 'NO_ACTION' };
      }),
      catchError((err) => ObservableOf(new AuthActions.AuthError(err)))
    );

  @Effect()
  login: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.LOGIN)
    .pipe(
      switchMap(payload => {
        return ObservableFrom(this.googleLogin());
      }),
      map(credential => {
        // successful login
        return new AuthActions.GetUser();
      }),
      catchError((err) => ObservableOf(new AuthActions.AuthError(err)))
    );

  @Effect()
  redirectToLogin: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.NOT_AUTHENTICATED_REDIRECT).pipe(
    map(payload => {
      this.router.navigate(['login']);
      return { type: 'NO_ACTION' };
    })
  );


  private googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.fbAuth.auth.signInWithPopup(provider);
  }
}
