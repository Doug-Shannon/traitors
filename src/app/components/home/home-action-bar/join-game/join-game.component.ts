import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  @Output() roomCodeEntered = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();
  public joinGameForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.joinGameForm = this.fb.group({
      'roomCode' : [null, [Validators.required, Validators.pattern(/[a-zA-z]{8}/g)]]
    });
  }

  cancelJoin() {
    this.cancel.emit();
  }

  joinGameSubmit() {
    if (this.joinGameForm.valid) {
      this.roomCodeEntered.emit(this.joinGameForm.value.roomCode);
    }
  }

}
