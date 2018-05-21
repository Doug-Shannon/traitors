import { Component, OnInit, Input } from '@angular/core';
import { Game, User } from '../../../../models';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  @Input() game: Game;
  @Input() user: User;
  public userIsOwner = false;

  constructor() { }

  ngOnInit() {
    this.userIsOwner = this.user.uid === this.game.owner.id;
  }

}
