import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { User } from '../models';
import { UrlSegment } from '@angular/router';

export interface AuthState {
  user: User;
  error?: any;
  loading?: boolean;
  redirectUrlSegment?: string[];
}

export const initialState: AuthState = {
  user: new User(null)
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.GET_USER:
      return {...state, loading: true};
    case AuthActionTypes.LOGIN:
      return {...state, loading: true};
    case AuthActionTypes.USER_AUTHENTICATED:
      return {...state, user: action.payload };
    case AuthActionTypes.GET_PLAYER_SUCCESS:
      return { ...state, user: {...state.user, player: action.payload }, loading: false };
    case AuthActionTypes.USER_NOT_AUTHENTICATED:
      return {...state, ...initialState, loading: false};
    case AuthActionTypes.LOGOUT:
      return {...state, loading: true};
    case AuthActionTypes.NOT_AUTHENTICATED_REDIRECT:
      return { ...state, redirectUrlSegment: action.payload};
    case AuthActionTypes.AUTH_ERROR:
        return { ...state, error: action.payload};
    default:
      return state;
  }
}
