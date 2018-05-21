import { Player } from '.';

export interface IGame {
  id?: string;
  name: string;
  owner?: Player;
  gameJoinCode?: string;
  players?: Player[];
}

export class Game implements IGame {
  constructor(
    public name: string,
    public id?: string,
    public owner?: Player,
    public players?: Player[],
    public gameJoinCode?: string
  ) {}
}
