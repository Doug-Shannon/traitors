import { Action } from '@ngrx/store';
import { GameStatus, GameStatusType } from '../models';
import { Map as iMap } from 'immutable';

export enum GSActionTypes {
  GET = '[GameStatuses] Get',
  GET_SUCCESS = '[GameStatuses] Get success',
  GET_FAILED = '[GameStatuses] Get failed'
}

export class Get implements Action {
  readonly type = GSActionTypes.GET;
}

export class GetSuccess implements Action {
  readonly type = GSActionTypes.GET_SUCCESS;
  constructor(public payload: iMap<GameStatusType, GameStatus>) {}
}

export class GetFailed implements Action {
  readonly type = GSActionTypes.GET_FAILED;
  constructor(public payload: Error) {}
}

export type GameStatusesActions = Get | GetSuccess | GetFailed;
