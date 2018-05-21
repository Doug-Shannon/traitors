import { Action } from '@ngrx/store';
import { GamesActions, GamesActionTypes } from '../actions/games.actions';
import { Game, ProcessingStatus } from '../models';

export interface GamesState {
  games: Game[];
  error?: string;
  loading?: boolean;
  createstatus?: ProcessingStatus;
  joinstatus?: ProcessingStatus;
}

export const initialState: GamesState = {
  games: [],
  createstatus: ProcessingStatus.NONE,
  joinstatus: ProcessingStatus.NONE
};

export function reducer(state = initialState, action: GamesActions): GamesState {
  switch (action.type) {
    case GamesActionTypes.CREATE_GAME_MODE:
      return { ...state, createstatus: action.payload };
    case GamesActionTypes.SAVE_NEW_GAME:
      return { ...state, createstatus: ProcessingStatus.PROCESSING };
    case GamesActionTypes.SAVE_NEW_GAME_SUCCESS:
      return { ...state, ...{ games: [...state.games, action.payload] }, createstatus: ProcessingStatus.NONE };
    case GamesActionTypes.JOIN_GAME_MODE:
      return { ...state, joinstatus: action.payload };
    case GamesActionTypes.JOIN_GAME:
      return { ...state, joinstatus: ProcessingStatus.PROCESSING };
    case GamesActionTypes.JOIN_GAME_SUCCESS:
      return { ...state, ...{ games: [...state.games, action.payload] }, joinstatus: ProcessingStatus.NONE };
    case GamesActionTypes.GET_GAMES:
      return { ...state, loading: true };
    case GamesActionTypes.GET_GAMES_SUCCESS:
      return { ...state, ...{ games: action.payload }, loading: false };
    case GamesActionTypes.GAMES_ERROR:
      return { ...state, error: action.payload };
      // case GamesActionTypes.DELETE_GAME_SUCCESS:
      //   const idx = state.games.findIndex((game: Game) => game.id === action.payload);
      //   return { ...state, ...{ games: [...state.games.slice(0, idx), ...state.games.slice(idx + 1)] }, loading: false };
    default:
      return state;
  }
}
