import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers';
import * as GamesActions from '../../../../actions/games.actions';
import { Game } from '../../../../models';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  @Output() gameCreated = new EventEmitter<Game>();
  @Output() cancel = new EventEmitter();
  public createGameForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createGameForm = this.fb.group({
      gameName: [null, Validators.required]
    });
  }

  cancelNewGame() {
    this.cancel.emit();
  }

  newGameSubmit() {
    if (this.createGameForm.valid) {
      this.gameCreated.emit(new Game({ name: this.createGameForm.value.gameName }));
    }
  }
}
