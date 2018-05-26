import { Component, OnInit, Input } from '@angular/core';
import { Game, User, ProcessingStatus } from '../../../../models';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  public processingStatus = ProcessingStatus;
  @Input() game: Game;
  @Input() user: User;
  public userIsOwner = false;

  constructor() {}

  ngOnInit() {
    if (this.game.owner && this.game.owner.id) this.userIsOwner = this.user.uid === this.game.owner.id;
  }
}
