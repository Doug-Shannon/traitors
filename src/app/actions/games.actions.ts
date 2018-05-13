import { Action } from '@ngrx/store';
import { Game } from '../models';

export enum GamesActionTypes {
  GET_GAMES = '[Games] Get',
  GET_GAMES_SUCCESS = '[Games] Get success',
  GET_GAMES_FAILURE = '[Games] Get failure',
  CREATE_GAME = '[Games] Create',
  CREATE_GAME_SUCCESS = '[Games] Create success',
  CREATE_GAME_FAILURE = '[Games] Create failure',
  DELETE_GAME = '[Games] Delete',
  DELETE_GAME_SUCCESS = '[Games] Delete success',
  DELETE_GAME_FAILURE = '[Games] Delete failure',
  GAMES_ERROR = '[Games] Error'
}

export class GetGames implements Action {
  public readonly type = GamesActionTypes.GET_GAMES;
}

export class GetGamesSuccess implements Action {
  public readonly type = GamesActionTypes.GET_GAMES_SUCCESS;

  constructor(public payload: Game[]) { }
}

export class CreateGame implements Action {
  public readonly type = GamesActionTypes.CREATE_GAME;

  constructor(public payload: Game) { }
}

export class CreateGameSuccess implements Action {
  public readonly type = GamesActionTypes.CREATE_GAME_SUCCESS;

  constructor(public payload: Game) { }
}

export class DeleteGame implements Action {
  public readonly type = GamesActionTypes.DELETE_GAME;

  constructor(public payload: string) { }
}

export class DeleteGameSuccess implements Action {
  public readonly type = GamesActionTypes.DELETE_GAME_SUCCESS;

  constructor(public payload: string) { }
}

export class GamesError implements Action {
  public readonly type = GamesActionTypes.GAMES_ERROR;

  constructor(public payload: string) { }
}

export type GamesActions = GetGames | GetGamesSuccess | CreateGame | CreateGameSuccess | DeleteGame | DeleteGameSuccess | GamesError;
