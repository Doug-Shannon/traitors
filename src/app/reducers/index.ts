import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromGames from './games.reducer';
import * as fromGameStatuses from './game-status.reducer';
import { Record } from 'immutable';

export interface AppState {
  auth: fromAuth.AuthState;
  games: fromGames.GamesState;
  gameStatuses: fromGameStatuses.GameStatusesState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  games: fromGames.reducer,
  gameStatuses: fromGameStatuses.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
