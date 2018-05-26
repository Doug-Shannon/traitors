import { Action } from '@ngrx/store';
import { GamesActions, GamesActionTypes } from '../actions/games.actions';
import { Game, ProcessingStatus } from '../models';

import { Record, List } from 'immutable';

export interface IGamesState {
  games: List<Game>;
  error?: Error;
  loading?: boolean;
  createstatus?: ProcessingStatus;
  joinstatus?: ProcessingStatus;
}

const GamesStateFactory = Record<IGamesState>({
  games: List(),
  error: null,
  loading: null,
  createstatus: ProcessingStatus.NONE,
  joinstatus: ProcessingStatus.NONE
});

export class GamesState extends GamesStateFactory implements IGamesState {
  constructor(config: Partial<IGamesState>) {
    super(config);
  }
}

const initialState = GamesStateFactory();

export function reducer(state = initialState, action: GamesActions): GamesState {
  switch (action.type) {
    case GamesActionTypes.CREATE_GAME_MODE:
      return state.set('createstatus', action.payload);
    case GamesActionTypes.SAVE_NEW_GAME:
      return state.set('createstatus', ProcessingStatus.PROCESSING);
    case GamesActionTypes.JOIN_GAME_MODE:
      return state.set('joinstatus', action.payload);
    case GamesActionTypes.JOIN_GAME:
      return state.set('joinstatus', ProcessingStatus.PROCESSING);
    case GamesActionTypes.SAVE_NEW_GAME_SUCCESS:
      //sometimes the firestore link returns before the save success, we need to handle that here
      if (state.games.find(g => g.id === action.payload)) {
        return state.set('createstatus', ProcessingStatus.NONE);
      } else {
        return state.set('createstatus', ProcessingStatus.NONE).update('games', games => {
          return games.push(new Game({ id: action.payload, processingStatus: ProcessingStatus.PROCESSING }));
        });
      }
    case GamesActionTypes.JOIN_GAME_SUCCESS:
      //sometimes the firestore link returns before the save success, we need to handle that here
      if (state.games.find(g => g.id === action.payload)) {
        return state.set('joinstatus', ProcessingStatus.NONE);
      } else {
        return state.set('joinstatus', ProcessingStatus.NONE).update('games', games => {
          return games.push(new Game({ id: action.payload, processingStatus: ProcessingStatus.PROCESSING }));
        });
      }
    case GamesActionTypes.GET_GAMES:
      return state.set('loading', true);
    case GamesActionTypes.GET_GAMES_SUCCESS:
      return state.set('loading', false).set('games', action.payload);
    case GamesActionTypes.GAMES_ERROR:
      console.log(action.payload);
      return state.set('error', action.payload);
    case GamesActionTypes.FIRESTORE_GAMES_MODIFIED:
    case GamesActionTypes.FIRESTORE_GAMES_ADDED:
      const game = action.payload.set('processingStatus', ProcessingStatus.NONE);
      return state.update('games', games => {
        const idx = state.games.findIndex(g => g.id === game.id);
        if (idx === -1) {
          return games.push(game);
        } else {
          return games.set(idx, game);
        }
      });
    // case GamesActionTypes.DELETE_GAME_SUCCESS:
    //   const idx = state.games.findIndex((game: Game) => game.id === action.payload);
    //   return { ...state, ...{ games: [...state.games.slice(0, idx), ...state.games.slice(idx + 1)] }, loading: false };
    default:
      return state;
  }
}
