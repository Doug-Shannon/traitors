import { Action } from '@ngrx/store';
import { GameStatusesActions, GSActionTypes } from '../actions/game-status.actions';
import { GameStatus, GameStatusType } from '../models';
import { Map as iMap } from 'immutable';

export interface GameStatusesState {
  statuses: iMap<GameStatusType, GameStatus>;
  error?: Error;
  loading?: boolean;
}

export const initialState: GameStatusesState = {
  statuses: null
};

export function reducer(state = initialState, action: GameStatusesActions): GameStatusesState {
  switch (action.type) {
    case GSActionTypes.GET:
      return { ...state, loading: true };
    case GSActionTypes.GET_SUCCESS:
      let s = { ...state, ...{ statuses: action.payload }, loading: false };
      // console.log(s);
      return s;
    case GSActionTypes.GET_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
