import { Player } from '.';

export interface IGame {
    id?: string;
    name: string;
    owner?: Player;
    players?: Player[];
}

export class Game implements IGame {
    constructor(public name: string, public id?: string, public owner?: Player, public players?: Player[] ) { }
    
}
