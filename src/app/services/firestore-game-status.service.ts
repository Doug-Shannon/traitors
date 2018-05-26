import { Injectable } from '@angular/core';

import { pipe } from 'rxjs';
import { switchMap, map, first } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

import { GameStatus, GameStatusType } from '../models';

import { Map as iMap } from 'immutable';

@Injectable({
  providedIn: 'root'
})
export class FirestoreGameStatusService {
  constructor(private fsDB: AngularFirestore) {}

  public getGameStatuses = pipe(
    switchMap(action => this.fsDB.collection('gameStatuses').snapshotChanges()),

    first(),

    map(actions => {
      return iMap<GameStatusType, GameStatus>(
        actions.map(a => {
          const data = a.payload.doc.data() as GameStatus;
          return [data.type, data] as [GameStatusType, GameStatus];
        })
      );
    })
  );
}
