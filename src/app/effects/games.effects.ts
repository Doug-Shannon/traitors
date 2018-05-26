import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as GamesActions from '../actions/games.actions';
import { Game } from '../models';

import { FirestoreGamesService } from '../services/firestore-games.service';
import { List } from 'immutable';

@Injectable()
export class GamesEffects {
  constructor(private actions$: Actions, private fsGames: FirestoreGamesService) {}

  @Effect()
  getGames: Observable<Action> = this.actions$.ofType(GamesActions.GamesActionTypes.GET_GAMES).pipe(
    this.fsGames.getGames,

    map(games => new GamesActions.GetGamesSuccess(List(games))),

    catchError(err => ObservableOf(new GamesActions.GamesError(err)))
  );

  @Effect()
  createGame: Observable<Action> = this.actions$.ofType(GamesActions.GamesActionTypes.SAVE_NEW_GAME).pipe(
    this.fsGames.createGame,

    map(docref => new GamesActions.SaveNewGameSuccess(docref.id)),

    catchError(err => ObservableOf(new GamesActions.GamesError(err)))
  );

  @Effect()
  joinGame: Observable<Action> = this.actions$.ofType(GamesActions.GamesActionTypes.JOIN_GAME).pipe(
    this.fsGames.joinGames,

    map(result => new GamesActions.JoinGameSuccess(result.id)),

    catchError(err => ObservableOf(new GamesActions.GamesError(err)))
  );

  @Effect()
  establishGamesFirestoreLink: Observable<Action> = this.actions$
    .ofType(GamesActions.GamesActionTypes.ESTABLISH_GAMES_FIRESTORE_LINK)
    .pipe(
      this.fsGames.linkWithFirestore,

      map(action => {
        return {
          type: `[Games firestore] Game ${action.type}`,
          payload: new Game({ ...action.payload.doc.data(), id: action.payload.doc.id })
        };
      }),

      catchError(err => ObservableOf(new GamesActions.GamesError(err)))
    );
}
