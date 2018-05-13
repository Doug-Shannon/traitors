import { Player } from './player';

export interface IUser {
    uid: string;
    player?: Player;
}

export class User implements IUser {
    public player = null;
    constructor(public uid: string) {}

}
