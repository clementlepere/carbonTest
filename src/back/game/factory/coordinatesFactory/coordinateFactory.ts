import { Coordinates } from "../../../models/Coordinates/coordinates";

export class coordinatesFactory {
    maxXValue: number;
    maxYValue: number;

    buildCoordinates(x: number, y: number): Coordinates {
        const coordinate = new Coordinates(x, y);
        return coordinate;
    }
}