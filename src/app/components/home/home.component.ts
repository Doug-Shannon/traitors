import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GamesState } from '../../reducers/games.reducer';
import * as GamesActions from '../../actions/games.actions';
import * as AuthActions from '../../actions/auth.actions';
import { AppState } from '../../reducers';
import { Game, CreateGameStatus, Player } from '../../models';
import { AuthState } from '../../reducers/auth.reducer';
import { take } from 'rxjs/operators';
import { auth } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private games;
  private user: Store<AuthState>;
  public createGameStatus = CreateGameStatus;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GamesActions.GetGames());
    this.games = this.store.select(state => state.games);
    this.user = this.store.select(state => state.auth);
  }

  public logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  public newGame() {
    this.store.dispatch(new GamesActions.CreateGameMode(CreateGameStatus.NEW));
  }

  public gameCreated(game: Game) {
    this.store.dispatch(new GamesActions.SaveNewGame(game));
  }
}
