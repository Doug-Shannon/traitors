import { Record } from 'immutable';

export interface IPlayer {
  id: string;
  username: string;
  playersRef?: string;
  email: string;
}

const player = Record<IPlayer>({
  id: '',
  username: '',
  playersRef: '',
  email: ''
});

export class Player extends player implements IPlayer {
  constructor(config: Partial<IPlayer>) {
    if (!!config.id) {
      config.playersRef = `players/${config.id}`;
    }
    super(config);
  }
}
