import { Action } from '@ngrx/store';
import { User, Player } from '../models';
import { UrlSegment } from '@angular/router';

export enum AuthActionTypes {
  GET_USER = '[Auth] Get user',
  AUTHENTICATED = '[Auth] User authenticated',
  NOT_AUTHENTICATED = '[Auth] User not authenticated',
  GET_PLAYER_SUCCESS = '[Auth] Get player success',
  LOGIN = '[Auth] Login',
  LOGIN_FAILURE = '[Auth] Login failure',
  LOGOUT = '[Auth] Logout',
  ERROR = '[Auth] Error',
  NOT_AUTHENTICATED_REDIRECT = '[Auth] Not authenticated redirect'
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
}

export class Authenticated implements Action {
  readonly type = AuthActionTypes.AUTHENTICATED;

  constructor(public payload: User) {}
}

export class NotAuthenticated implements Action {
  readonly type = AuthActionTypes.NOT_AUTHENTICATED;
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class Error implements Action {
  readonly type = AuthActionTypes.ERROR;

  constructor(public payload) {}
}

export class NotAuthenticatedRedirect implements Action {
  readonly type = AuthActionTypes.NOT_AUTHENTICATED_REDIRECT;

  constructor(public payload: string[]) {}
}

export class GetPlayerSuccess implements Action {
  readonly type = AuthActionTypes.GET_PLAYER_SUCCESS;

  constructor(public payload: Player) {}
}

export type AuthActions =
  | GetUser
  | Authenticated
  | NotAuthenticated
  | Login
  | LoginFailure
  | Logout
  | NotAuthenticatedRedirect
  | GetPlayerSuccess
  | Error;
