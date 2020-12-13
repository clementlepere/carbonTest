export class Board {
    protected width: number;
    protected height: number;
    map = Array<Array<string>>();

    constructor(width: number, height: number) {
        this.width = (width <= 0 || width === undefined)
            ? 0 : width;
        this.height = (height <= 0 || height === undefined)
            ? 0 : height;
        for (let i = 0; i < this.height; i++) {
            this.map[i] = new Array();
            for (let j = 0; j < this.width; j++) {
                this.map[i][j] = 'X';
            }
        }
    }
}
