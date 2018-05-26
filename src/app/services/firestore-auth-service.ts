import { Injectable } from '@angular/core';

import { pipe, from as ObservableFrom } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

import { Player } from '../models';

import { Map as iMap } from 'immutable';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreAuthService {
  constructor(private fsDB: AngularFirestore, private store: Store<AppState>, private fAuth: AngularFireAuth) {}

  public getLoggedinPlayer = pipe(
    withLatestFrom(this.store.select('auth')),

    switchMap(([action, auth]) =>
      this.fsDB
        .collection('players')
        .doc(auth.user.uid)
        .snapshotChanges()
    ),

    map(action => new Player({ ...action.payload.data(), id: action.payload.id }))
  );

  public getAuthStatus = switchMap(() => this.fAuth.authState);

  public signOut = switchMap(() => ObservableFrom(this.fAuth.auth.signOut()));

  public signIn = switchMap(() => this.googleLogin());

  private googleLogin() {
    return ObservableFrom(this.fAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }
}
