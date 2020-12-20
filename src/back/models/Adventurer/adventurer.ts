import { Coordinates } from "../Coordinates/coordinates";
import { Treasure } from "../Treasure/treasure";
import { Map } from '../Map/map';

export class Adventurer {
    score: number;
    coordinates: Coordinates;
    direction: string;
    readonly name: string

    constructor(name: string, x: number, y: number, direction: string, score: number) {
        this.score = score;
        this.coordinates = new Coordinates(x, y);
        this.direction = direction;
        this.name = name;
    }

    // move(move: string, direction: string, map: Map) {
    //     let storedVerticalLocation = this.coordinates.x;
    //     let storedHorizontalLocation = this.coordinates.y;
    //     switch (move) {
    //         case 'A': {
    //             switch (direction) {
    //                 case 'N': {
    //                     if (this.checkMoveValidity(map, --storedVerticalLocation, storedHorizontalLocation)
    //                     ) {
    //                         this.score += this.updateScore(map[storedVerticalLocation][storedHorizontalLocation]);
    //                         map[player.playerVerticalLocation][player.playerHorizontalLocation] =
    //                             this.updateOldBoardLocation(map[player.playerVerticalLocation][player.playerHorizontalLocation]);
    //                         map[--player.playerVerticalLocation][player.playerHorizontalLocation] =
    //                             this.updateNewBoardLocation(map[storedVerticalLocation][storedHorizontalLocation], player);
    //                     }
    //                     break;
    //                 }
    //                 case 'S': {
    //                     if (this.checkMoveValidity(map, ++storedVerticalLocation, storedHorizontalLocation)
    //                     ) {
    //                         this.score += this.updateScore(map[storedVerticalLocation][storedHorizontalLocation]);
    //                         map[player.playerVerticalLocation][player.playerHorizontalLocation] =
    //                             this.updateOldBoardLocation(map[player.playerVerticalLocation][player.playerHorizontalLocation]);
    //                         map[++player.playerVerticalLocation][player.playerHorizontalLocation] =
    //                             this.updateNewBoardLocation(map[storedVerticalLocation][storedHorizontalLocation], player);
    //                     }
    //                     break;
    //                 }
    //                 case 'E': {
    //                     if (this.checkMoveValidity(map, storedVerticalLocation, ++storedHorizontalLocation)
    //                     ) {
    //                         this.score += this.updateScore(map[storedVerticalLocation][storedHorizontalLocation]);
    //                         map[player.playerVerticalLocation][player.playerHorizontalLocation] =
    //                             this.updateOldBoardLocation(map[player.playerVerticalLocation][player.playerHorizontalLocation]);
    //                         map[player.playerVerticalLocation][++player.playerHorizontalLocation] =
    //                             this.updateNewBoardLocation(map[storedVerticalLocation][storedHorizontalLocation], player);
    //                     }
    //                     break;
    //                 }
    //                 case 'O': {
    //                     if (this.checkMoveValidity(map, storedVerticalLocation, --storedHorizontalLocation)
    //                     ) {
    //                         this.score += this.updateScore(map[storedVerticalLocation][storedHorizontalLocation]);
    //                         map[player.playerVerticalLocation][player.playerHorizontalLocation] =
    //                             this.updateOldBoardLocation(map[player.playerVerticalLocation][player.playerHorizontalLocation]);
    //                         map[player.playerVerticalLocation][--player.playerHorizontalLocation] =
    //                             this.updateNewBoardLocation(map[storedVerticalLocation][storedHorizontalLocation], player);
    //                     }
    //                     break;
    //                 }
    //             }
    //             break;
    //         }
    //         case 'G': {
    //             switch (direction) {
    //                 case 'N': {
    //                     this.direction = 'O';
    //                     break;
    //                 }
    //                 case 'S': {
    //                     this.direction = 'E';
    //                     break;
    //                 }
    //                 case 'E': {
    //                     this.direction = 'N';
    //                     break;
    //                 }
    //                 case 'O': {
    //                     this.direction = 'S';
    //                 }
    //             }
    //             break;
    //         }
    //         case 'D': {
    //             switch (direction) {
    //                 case 'N': {
    //                     this.direction = 'E';
    //                     break;
    //                 }
    //                 case 'S': {
    //                     this.direction = 'O';
    //                     break;
    //                 }
    //                 case 'E': {
    //                     this.direction = 'S';
    //                     break;
    //                 }
    //                 case 'O': {
    //                     this.direction = 'N';
    //                     break;
    //                 }
    //             }
    //             break;
    //         }
    //     }
    // }

    takeTreasure(treasure: Treasure) {
        if (treasure.x === this.coordinates.x && treasure.y === this.coordinates.y) {
            this.score++;
        }
    }

    turn() {

    }
}