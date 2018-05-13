export interface IPlayer {
    id: string;
    username: string;
    ref: string;
    email: string;
}

export class Player implements IPlayer {
    public ref: string;

    constructor(public id: string, public username: string, public email: string) {
        this.ref = `players\${uid}`;
    }

}
