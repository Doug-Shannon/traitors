import { Injectable } from '@angular/core';

import { pipe, of as ObservableOf, from as ObservableFrom } from 'rxjs';
import { withLatestFrom, switchMap, skip, mergeMap, map, first } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireFunctions } from 'angularfire2/functions';
import { Action, Store } from '@ngrx/store';

import { Game, ProcessingStatus } from '../models';
import { AppState } from '../reducers';
import { AuthState } from '../reducers/auth.reducer';
import * as GamesActions from '../actions/games.actions';

@Injectable({
  providedIn: 'root'
})
export class FirestoreGamesService {
  constructor(
    private fsDB: AngularFirestore,
    private store: Store<AppState>,
    private fsFunctions: AngularFireFunctions
  ) {}

  public Prep<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  public getGames = pipe(
    // get the logged in user
    withLatestFrom(this.store.select('auth')),
    // get the games from firebase
    switchMap(([action, auth]: [GamesActions.GetGames, AuthState]) => {
      return this.fsDB
        .collection('games')
        .snapshotChanges()
        .pipe(
          map(actions => actions.filter(a => new Game(a.payload.doc.data()).players.find(p => p.id == auth.user.uid)))
        );
    }),
    // only take the 1 dataset
    first(),
    map(actions => {
      return actions.map(a => {
        return new Game(a.payload.doc.data())
          .set('id', a.payload.doc.id)
          .set('processingStatus', ProcessingStatus.NONE);
      });
    })
  );

  public createGame = pipe(
    withLatestFrom(this.store.select('auth')),

    switchMap(([a, auth]: [GamesActions.SaveNewGame, any]) => {
      const player = auth.user.player;
      const newGame = new Game(a.payload)
        .set('owner', player)
        .update('players', players => players.clear().push(player));
      return ObservableFrom(this.fsDB.collection('games').add(this.Prep(newGame.toJS())));
    })
  );

  public linkWithFirestore = pipe(
    withLatestFrom(this.store.select('auth')),

    switchMap(action => {
      return this.fsDB.collection('games').stateChanges();
    }),

    skip(1),

    mergeMap(actions => actions)
  );

  public joinGames = pipe(
    // get the logged in user
    withLatestFrom(this.store.select('auth')),

    switchMap(([action, auth]: [GamesActions.JoinGame, AuthState]) => {
      return this.fsFunctions.httpsCallable<{ joinCode: string; player: any }, { id: string }>('joinRoomOnCall')({
        joinCode: action.payload,
        player: auth.user.player.toJS()
      });
    })
  );
}
