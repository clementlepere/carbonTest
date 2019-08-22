export class Mountain {
    mountainHorizontalLocation: number;
    mountainVerticalLocation: number;

    constructor(mountainHorizontalLocation: number, mountainVerticalLocation: number) {
        this.mountainHorizontalLocation = (mountainHorizontalLocation <= 0 || mountainHorizontalLocation === undefined)
            ? 0 : mountainHorizontalLocation;
        this.mountainVerticalLocation = (mountainVerticalLocation <= 0 || mountainVerticalLocation === undefined)
            ? 0 : mountainVerticalLocation;
    }
}
