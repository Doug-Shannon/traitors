import { Action } from '@ngrx/store';
import { Game, CreateGameStatus } from '../models';

export enum GamesActionTypes {
  GET_GAMES = '[Games] Get',
  GET_GAMES_SUCCESS = '[Games] Get success',
  GET_GAMES_FAILURE = '[Games] Get failure',
  CREATE_GAME_MODE = '[Games] Create mode',
  SAVE_NEW_GAME = '[Games] Save new',
  SAVE_NEW_GAME_SUCCESS = '[Games] Save new success',
  SAVE_NEW_GAME_FAILURE = '[Games] Save new failure',
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

export class SaveNewGame implements Action {
  public readonly type = GamesActionTypes.SAVE_NEW_GAME;

  constructor(public payload: Game) { }
}

export class SaveNewGameSuccess implements Action {
  public readonly type = GamesActionTypes.SAVE_NEW_GAME_SUCCESS;

  constructor(public payload: Game) { }
}

export class CreateGameMode implements Action {
  public readonly type = GamesActionTypes.CREATE_GAME_MODE;

  constructor(public payload: CreateGameStatus) { }
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

export type GamesActions = GetGames |
                          GetGamesSuccess |
                          CreateGameMode |
                          SaveNewGame |
                          SaveNewGameSuccess |
                          DeleteGame |
                          DeleteGameSuccess |
                          GamesError;
