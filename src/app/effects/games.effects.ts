import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of as ObservableOf, from as ObservableFrom } from 'rxjs';
import { switchMap, map, catchError, first, flatMap, combineLatest, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as GamesActions from '../actions/games.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { Game, Player } from '../models';

import 'rxjs/operators/switchMap';
import { AppState } from '../reducers';
import { FirestoreHelperService } from '../services/firestore-helper.service';
import { AuthState } from '../reducers/auth.reducer';

@Injectable()
export class GamesEffects {
  constructor(
    private actions$: Actions,
    private firestoredb: AngularFirestore,
    private store: Store<AppState>,
    private fsHelper: FirestoreHelperService
  ) {}

  @Effect()
  getGames: Observable<Action> = this.actions$.ofType(GamesActions.GamesActionTypes.GET_GAMES).pipe(
    // get the logged in user
    withLatestFrom(this.store.select('auth')),
    // get the games from firebase
    switchMap(([action, auth]: [GamesActions.GetGames, AuthState]) => {
      return this.firestoredb
        .collection('games')
        .snapshotChanges()
        .pipe(
          map(actions => {
            // that the user is involved in
            return actions.filter(a => {
              const response = a.payload.doc.data();
              if (response.players && response.players.find(p => p.id == auth.user.uid)) {
                return true;
              }
            });
          })
        );
    }),
    // only take the 1 dataset
    first(),
    map(actions => {
      return actions.map(a => {
        const response = a.payload.doc.data();
        response.id = a.payload.doc.id;
        return response as Game;
      });
    }),
    map(games => {
      return new GamesActions.GetGamesSuccess(games);
    }),
    catchError(err => ObservableOf(new GamesActions.GamesError(err)))
  );

  @Effect()
  createGame: Observable<Action> = this.actions$.ofType(GamesActions.GamesActionTypes.SAVE_NEW_GAME).pipe(
    withLatestFrom(this.store.select('auth')),
    switchMap(([a, auth]: [GamesActions.SaveNewGame, any]) => {
      const newGame = a.payload;
      const player = Player.FromPlayer(auth.user.player);
      newGame.owner = player;
      newGame.players = [player];
      return ObservableFrom(this.firestoredb.collection('games').add(this.fsHelper.Prep(newGame))).pipe(
        first(),
        map(docref => {
          newGame.id = docref.id;
          return newGame;
        })
      );
    }),
    map(game => {
      return new GamesActions.SaveNewGameSuccess(game);
    }),
    catchError(err => ObservableOf(new GamesActions.GamesError(err)))
  );

  @Effect()
  joinGame: Observable<Action> = this.actions$.ofType(GamesActions.GamesActionTypes.JOIN_GAME).pipe(
    // get the logged in user
    withLatestFrom(this.store.select('auth')),
    // get the games from firebase
    switchMap(([action, auth]: [GamesActions.JoinGame, AuthState]) => {
      return this.firestoredb
        .collection('gameJoinCodes', ref => ref.where('code', '==', action.payload))
        .snapshotChanges()
        .pipe(
          map(gameJoinCodeActions => {
            if (gameJoinCodeActions[0]) {
              return gameJoinCodeActions[0].payload.doc.data();
            } else {
              throw Error('Game Code Not Found');
            }
          }),
          flatMap((gameJoinCode: { code: string; gameRef: string }) => {
            return this.firestoredb
              .collection('games')
              .doc(gameJoinCode.gameRef)
              .snapshotChanges()
              .pipe(first());
          }),
          flatMap(gameAction => {
            if (gameAction) {
              const game = gameAction.payload.data() as Game;
              game.id = gameAction.payload.id;
              const currentPlayer = Player.FromPlayer(auth.user.player);
              const newPlayers = [...game.players, currentPlayer];
              return ObservableFrom(
                this.firestoredb
                  .collection('games')
                  .doc(game.id)
                  .update(this.fsHelper.Prep({ players: newPlayers }))
              ).pipe(
                first(),
                map(() => {
                  game.players = newPlayers;
                  return game;
                })
              );
            } else {
              throw Error("Game doesn't exist");
            }
          })
        );
    }),
    first(),
    map(game => {
      return new GamesActions.JoinGameSuccess(game);
    }),
    catchError(err => ObservableOf(new GamesActions.GamesError(err)))
  );
}
