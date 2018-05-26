import { Player } from './player';
import { Record } from 'immutable';

export enum TeamVote {
  APPROVE = 1000,
  DENY = 2000
}

export enum MissionVote {
  PASS = 1000,
  FAIL = 2000
}

export interface IPlayerSelection {
  player: Player;
  vote: MissionVote | TeamVote;
}

const PlayerSelectionFactory = Record({
  player: null,
  vote: null
});

export class PlayerSelection extends PlayerSelectionFactory implements IPlayerSelection {
  constructor(config: Partial<IPlayerSelection>) {
    super(config);
  }
}
