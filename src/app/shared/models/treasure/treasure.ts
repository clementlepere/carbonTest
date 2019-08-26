export class Treasure {
    treasureHorizontalLocation: number;
    treasureVerticalLocation: number;
    score: number;

    constructor(treasureHorizontalLocation: number, treasureVerticalLocation: number, score: number) {
        this.treasureHorizontalLocation = (treasureHorizontalLocation <= 0 || treasureHorizontalLocation === undefined)
            ? 0 : treasureHorizontalLocation;
        this.treasureVerticalLocation = (treasureVerticalLocation <= 0 || treasureVerticalLocation === undefined)
            ? 0 : treasureVerticalLocation;
        this.score = (score < 0 || score === undefined) ? 0 : score;
    }
}
