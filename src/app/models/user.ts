import { Player } from './player';
import { Record } from 'immutable';

export interface IUser {
  uid: string;
  player?: Player;
}

const user = Record<IUser>({
  uid: null,
  player: null
});

export class User extends user implements IUser {
  constructor(config: Partial<IUser>) {
    super(config);
  }
}
