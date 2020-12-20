import { PointOfInterest } from "../PointOfInterest/pointOfInterest";

export class Treasure extends PointOfInterest {
    score: number;

    constructor(x: number, y: number, score: number) {
        super(x, y);
        this.score = score;
    }
}