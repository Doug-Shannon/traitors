import { Player, ProcessingStatus } from '.';
import { Round } from './round';
import { Configuration } from './configuration';
import { GameStatus } from './game-status';

import { Record, List } from 'immutable';

export interface IGame {
  name: string;
  id?: string;
  owner?: Player;
  players?: List<Player>;
  gameJoinCode?: string;
  processingStatus?: ProcessingStatus;
  gameStatus: GameStatus;
  rounds?: List<Round>;
  configuration?: Configuration;
  outcome?: GameStatus;
}

const GameFactory = Record<IGame>({
  name: null,
  id: null,
  owner: null,
  players: List(),
  gameJoinCode: null,
  processingStatus: null,
  gameStatus: null,
  rounds: List(),
  configuration: null,
  outcome: null
});

export class Game extends GameFactory implements IGame {
  constructor(config: Partial<IGame>) {
    super(config);
  }

  public Process() {
    // for each round, round.calc
    // process status
    // process outcome
  }
}
