import { Record } from 'immutable';

export enum GameStatusType {
  TEAM_SELECTION = 1000,
  TEAM_CONFIRMATION = 2000,
  TEAM_CONFIRMATION_FAILED = 3000,
  MISSION_VOTING = 4000,
  MISSION_SUCCESS = 5000,
  MISSION_FAILED = 6000,
  FIVE_TEAM_DENIES = 7000,
  GOOD_GUYS_WIN = 8000,
  BAD_GUYS_WIN = 9000
}

export interface IGameStatus {
  type: GameStatusType;
  text: string;
}

const gameStatus = Record<IGameStatus>(
  {
    type: null,
    text: ''
  },
  'GameStatus'
);

export class GameStatus extends gameStatus implements IGameStatus {
  type: GameStatusType;
  text: string;
  constructor(config: Partial<IGameStatus>) {
    super(config);
  }
}
