import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Game, ProcessingStatus } from '../../../models';
import { GamesState } from '../../../reducers/games.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import * as GamesActions from '../../../actions/games.actions';

@Component({
  selector: 'app-home-action-bar',
  templateUrl: './home-action-bar.component.html',
  styleUrls: ['./home-action-bar.component.css']
})
export class HomeActionBarComponent implements OnInit {
  @Input() gamesState: GamesState;
  public joiningGame = false;
  public processingStatus = ProcessingStatus;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  public newGame() {
    this.store.dispatch(new GamesActions.CreateGameMode(ProcessingStatus.NEW));
  }

  public newGameCancelled() {
    this.store.dispatch(new GamesActions.CreateGameMode(ProcessingStatus.NONE));
  }

  public gameCreated(game: Game) {
    this.store.dispatch(new GamesActions.SaveNewGame(game));
  }

  joinGame() {
    this.store.dispatch(new GamesActions.JoinGameMode(ProcessingStatus.NEW));
  }

  joinGameCancelled() {
    this.store.dispatch(new GamesActions.JoinGameMode(ProcessingStatus.NONE));
  }

  roomCodeEntered(roomCode: string) {
    this.store.dispatch(new GamesActions.JoinGame(roomCode));
  }

}
