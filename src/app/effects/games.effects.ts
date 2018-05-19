import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of as ObservableOf, from as ObservableFrom } from 'rxjs';
import { switchMap, map, catchError, first, flatMap, combineLatest, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as GamesActions from '../actions/games.actions';
import { AngularFirestore  } from 'angularfire2/firestore';
import { Game, Player } from '../models';

import 'rxjs/operators/switchMap';
import { AppState } from '../reducers';
import { FirestoreHelperService } from '../services/firestore-helper.service';
import { AuthState } from '../reducers/auth.reducer';

@Injectable()
export class GamesEffects {

  constructor(private actions$: Actions,
    private firestoredb: AngularFirestore,
    private store: Store<AppState>,
    private fsHelper: FirestoreHelperService) { }

  @Effect()
  getGames: Observable<Action> = this.actions$.ofType(GamesActions.GamesActionTypes.GET_GAMES)
    .pipe(
      withLatestFrom(this.store.select('auth')),
      switchMap(([a, auth]: [GamesActions.GetGames, AuthState]) => {
        return this.firestoredb.collection('games', ref => ref.where('owner.id', '==',  auth.user.uid)).snapshotChanges();
      }),
      first(),
      map(actions => {
        return actions.map(a => {
          const response = a.payload.doc.data() as Game;
          response.id = a.payload.doc.id;
          return response;
        });
      }),
      map(games => {
        return new GamesActions.GetGamesSuccess(games);
      }),
      catchError((err) => ObservableOf(new GamesActions.GamesError(err)))
    );

  @Effect()
  createGame: Observable<Action> = this.actions$.ofType(GamesActions.GamesActionTypes.SAVE_NEW_GAME)
    .pipe(
      withLatestFrom(this.store.select('auth')),
      switchMap(([a, auth]: [GamesActions.SaveNewGame, any]) => {
        const newGame = a.payload;
        newGame.owner = Player.FromPlayer(auth.user.player);
        return ObservableFrom(this.firestoredb.collection('games').add(this.fsHelper.Prep(newGame)))
          .pipe(
            map(docref => {
              return new Game(newGame.name, docref.id);
            })
          );
      }),
      map(game => {
        return new GamesActions.SaveNewGameSuccess(game);
      }),
      catchError((err) => ObservableOf(new GamesActions.GamesError(err)))
    );

}
