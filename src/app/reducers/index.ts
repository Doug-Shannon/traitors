import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromGames from './games.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  games: fromGames.GamesState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  games: fromGames.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
