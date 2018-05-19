import { Action } from '@ngrx/store';
import { GamesActions, GamesActionTypes } from '../actions/games.actions';
import { Game, CreateGameStatus } from '../models';

export interface GamesState {
  games: Game[];
  error?: string;
  loading?: boolean;
  createstatus?: CreateGameStatus;
}

export const initialState: GamesState = {
  games: [],
  createstatus: CreateGameStatus.NONE
};

export function reducer(state = initialState, action: GamesActions): GamesState {
  switch (action.type) {
    case GamesActionTypes.CREATE_GAME_MODE:
      return { ...state, createstatus: action.payload };
    case GamesActionTypes.GET_GAMES:
    case GamesActionTypes.DELETE_GAME:
    return { ...state };
    case GamesActionTypes.SAVE_NEW_GAME:
      return { ...state, createstatus: CreateGameStatus.SAVING};
    case GamesActionTypes.GET_GAMES_SUCCESS:
      return { ...state, ...{ games: action.payload }, loading: false };
    case GamesActionTypes.SAVE_NEW_GAME_SUCCESS:
      return { ...state, ...{ games: [...state.games, action.payload] }, createstatus: CreateGameStatus.NONE };
    case GamesActionTypes.DELETE_GAME_SUCCESS:
      const idx = state.games.findIndex((game: Game) => game.id === action.payload);
      return { ...state, ...{ games: [...state.games.slice(0, idx), ...state.games.slice(idx + 1)] }, loading: false };
    case GamesActionTypes.GAMES_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
