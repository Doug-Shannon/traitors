import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GamesState } from '../../reducers/games.reducer';
import * as GamesActions from '../../actions/games.actions';
import * as AuthActions from '../../actions/auth.actions';
import * as GamesStatusesActions from '../../actions/game-status.actions';
import { AppState } from '../../reducers';
import { Game, ProcessingStatus, Player } from '../../models';
import { AuthState } from '../../reducers/auth.reducer';
import { take } from 'rxjs/operators';
import { auth } from 'firebase';
import { Record } from 'immutable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private games;
  private user: Store<AuthState>;
  public joiningGame = false;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GamesActions.GetGames());
    this.store.dispatch(new GamesActions.EstablishGamesFirestoreLink());
    this.store.dispatch(new GamesStatusesActions.Get());
    this.games = this.store.select(state => state.games);
    this.user = this.store.select(state => state.auth);
  }

  public logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
