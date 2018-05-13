import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of as ObservableOf } from 'rxjs';
import { switchMap, map, catchError, first } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as GamesActions from '../actions/games.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { Game } from '../models';

@Injectable()
export class GamesEffects {

  constructor(private actions$: Actions,
    private firestoredb: AngularFirestore) {}

  @Effect()
  getGames: Observable<Action> = this.actions$.ofType(GamesActions.GamesActionTypes.GET_GAMES)
    .pipe(
      switchMap(action => this.firestoredb.collection('games').snapshotChanges()),
      first(),
      map(actions => {
        return actions.map(a => {
          const response = a.payload.doc.data() as Game;
          response.id = a.payload.doc.id;
          return response;
        });
      }),
      map(groups => {
        return new GamesActions.GetGamesSuccess(groups);
      }),
      catchError((err) => ObservableOf(new GamesActions.GamesError(err)))
    );

}
