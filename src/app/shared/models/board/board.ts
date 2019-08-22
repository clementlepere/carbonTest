export class Board {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = (width <= 0 || width === undefined)
            ? 0 : width;
        this.height = (height <= 0 || height === undefined)
            ? 0 : height;
    }
}
