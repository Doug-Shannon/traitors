import { Component, OnInit, Input } from '@angular/core';
import { User, Game } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.css']
})
export class GameDashboardComponent implements OnInit {
  @Input() user: User;
  @Input() games: Game[];

  constructor() { }

  ngOnInit() {
  }

  gameTrackBy(index, game) {
    return game.id;
  }

}
