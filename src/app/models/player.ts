export interface IPlayer {
    id: string;
    username: string;
    playersRef?: string;
    email: string;
}

export class Player implements IPlayer {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public playersRef: string = `players/${id}`) {
    }

    public static FromPlayer(p: Player) {
        return new Player(p.id, p.username, p.email);
    }
}
