export class Player {
    name: string;
    playerHorizontalLocation: number;
    playerVerticalLocation: number;
    orientation: string;
    path: string;

    constructor(playerHorizontalLocation: number, playerVerticalLocation: number, path: string) {
        this.playerHorizontalLocation = (playerHorizontalLocation <= 0 || playerHorizontalLocation === undefined)
            ? 0 : playerHorizontalLocation;
        this.playerVerticalLocation = (playerVerticalLocation <= 0 || playerVerticalLocation === undefined)
            ? 0 : playerVerticalLocation;
        this.path = (path === undefined) ? '' : path;
        this.name = (name === undefined) ? '' : name;
    }
}
