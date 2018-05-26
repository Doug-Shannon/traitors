import { GameStatus } from './game-status';
import { PlayerSelection } from './player-selection';
import { Player } from './player';
import { List, Record } from 'immutable';

export interface IAttempt {
  number: number;
  leader?: Player;
  status?: GameStatus;
  selectedTeam?: List<Player>;
  teamSelectionVotes?: List<PlayerSelection>;
  missionVotes?: List<PlayerSelection>;
  outcome?: GameStatus;
}

const AttemptFactory = Record<IAttempt>({
  number: null,
  leader: null,
  status: null,
  selectedTeam: List(),
  teamSelectionVotes: List(),
  missionVotes: List(),
  outcome: null
});

export class Attempt extends AttemptFactory implements IAttempt {
  constructor(config: Partial<Attempt>) {
    super(config);
  }

  public Process() {
    // process Status
    // process outcome
  }
}
