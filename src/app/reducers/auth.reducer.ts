import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { User, Player } from '../models';
import { UrlSegment } from '@angular/router';
import { Record } from 'immutable';

export interface IAuthState {
  user: User;
  error?: any;
  loading?: boolean;
  redirectUrlSegment?: string[];
}

const authState = Record<IAuthState>({
  user: new User(null),
  error: null,
  loading: null,
  redirectUrlSegment: null
});

export class AuthState extends authState implements IAuthState {
  constructor(config: Partial<IAuthState>) {
    super(config);
  }
}

const initialState = authState();

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.GET_USER:
      return state.set('loading', true);
    case AuthActionTypes.LOGIN:
      return state.set('loading', true);
    case AuthActionTypes.AUTHENTICATED:
      return state.set('user', action.payload);
    case AuthActionTypes.GET_PLAYER_SUCCESS:
      console.log(action.payload);
      return state.setIn(['user', 'player'], action.payload).set('loading', false);
    case AuthActionTypes.NOT_AUTHENTICATED:
      return initialState.set('loading', false);
    case AuthActionTypes.LOGOUT:
      return state.set('loading', false);
    case AuthActionTypes.NOT_AUTHENTICATED_REDIRECT:
      return state.set('redirectUrlSegment', action.payload);
    case AuthActionTypes.ERROR:
      return state.set('error', action.payload);
    default:
      return state;
  }
}
