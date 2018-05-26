import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as GSActions from '../actions/game-status.actions';
import { FirestoreGameStatusService } from '../services/firestore-game-status.service';

@Injectable()
export class GameStatusesEffects {
  constructor(private actions$: Actions, private fsGameStatus: FirestoreGameStatusService) {}

  @Effect()
  getStatuses: Observable<Action> = this.actions$.ofType(GSActions.GSActionTypes.GET).pipe(
    this.fsGameStatus.getGameStatuses,

    map(gameStatusMap => {
      return new GSActions.GetSuccess(gameStatusMap);
    }),

    catchError(err => ObservableOf(new GSActions.GetFailed(err)))
  );
}
