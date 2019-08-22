export class Player {
    name: string;
    playerHorizontalLocation: number;
    playerVerticalLocation: number;
    direction: string;
    path: string;

    constructor(name: string, playerHorizontalLocation: number, playerVerticalLocation: number,
        direction: string, path: string) {
        this.name = (name === undefined) ? '' : name;
        this.playerHorizontalLocation = (playerHorizontalLocation < 0 || playerHorizontalLocation === undefined)
            ? 0 : playerHorizontalLocation;
        this.playerVerticalLocation = (playerVerticalLocation < 0 || playerVerticalLocation === undefined)
            ? 0 : playerVerticalLocation;
        this.direction = (direction === undefined) ? '' : direction;
        this.path = (path === undefined) ? '' : path;
    }
}
