import { Injectable } from '@angular/core';
import { Player } from '@shared/models/player/player';

@Injectable()

export class GameService {

  constructor() { }

  movePlayer(board: Array<Array<string>>, player: Player): Array<Array<string>> {
    const returnedBoard = board;
    for (const move of player.path) {
      let storedVerticalLocation = player.playerVerticalLocation;
      let storedHorizontalLocation = player.playerHorizontalLocation;
      switch (move) {
        case 'A': {
          switch (player.direction) {
            case 'N': {
              if (this.checkMoveValidity(returnedBoard, --storedVerticalLocation, storedHorizontalLocation)
              ) {
                player.score += this.updateScore(returnedBoard[storedVerticalLocation][storedHorizontalLocation]);
                returnedBoard[player.playerVerticalLocation][player.playerHorizontalLocation] =
                  this.updateOldBoardLocation(returnedBoard[player.playerVerticalLocation][player.playerHorizontalLocation]);
                returnedBoard[--player.playerVerticalLocation][player.playerHorizontalLocation] =
                  this.updateNewBoardLocation(returnedBoard[storedVerticalLocation][storedHorizontalLocation], player);
              }
              break;
            }
            case 'S': {
              if (this.checkMoveValidity(returnedBoard, ++storedVerticalLocation, storedHorizontalLocation)
              ) {
                player.score += this.updateScore(returnedBoard[storedVerticalLocation][storedHorizontalLocation]);
                returnedBoard[player.playerVerticalLocation][player.playerHorizontalLocation] =
                  this.updateOldBoardLocation(returnedBoard[player.playerVerticalLocation][player.playerHorizontalLocation]);
                returnedBoard[++player.playerVerticalLocation][player.playerHorizontalLocation] =
                  this.updateNewBoardLocation(returnedBoard[storedVerticalLocation][storedHorizontalLocation], player);
              }
              break;
            }
            case 'E': {
              if (this.checkMoveValidity(returnedBoard, storedVerticalLocation, ++storedHorizontalLocation)
              ) {
                player.score += this.updateScore(returnedBoard[storedVerticalLocation][storedHorizontalLocation]);
                returnedBoard[player.playerVerticalLocation][player.playerHorizontalLocation] =
                  this.updateOldBoardLocation(returnedBoard[player.playerVerticalLocation][player.playerHorizontalLocation]);
                returnedBoard[player.playerVerticalLocation][++player.playerHorizontalLocation] =
                  this.updateNewBoardLocation(returnedBoard[storedVerticalLocation][storedHorizontalLocation], player);
              }
              break;
            }
            case 'O': {
              if (this.checkMoveValidity(returnedBoard, storedVerticalLocation, --storedHorizontalLocation)
              ) {
                player.score += this.updateScore(returnedBoard[storedVerticalLocation][storedHorizontalLocation]);
                returnedBoard[player.playerVerticalLocation][player.playerHorizontalLocation] =
                  this.updateOldBoardLocation(returnedBoard[player.playerVerticalLocation][player.playerHorizontalLocation]);
                returnedBoard[player.playerVerticalLocation][--player.playerHorizontalLocation] =
                  this.updateNewBoardLocation(returnedBoard[storedVerticalLocation][storedHorizontalLocation], player);
              }
              break;
            }
          }
          break;
        }
        case 'G': {
          switch (player.direction) {
            case 'N': {
              player.direction = 'O';
              break;
            }
            case 'S': {
              player.direction = 'E';
              break;
            }
            case 'E': {
              player.direction = 'N';
              break;
            }
            case 'O': {
              player.direction = 'S';
            }
          }
          break;
        }
        case 'D': {
          switch (player.direction) {
            case 'N': {
              player.direction = 'E';
              break;
            }
            case 'S': {
              player.direction = 'O';
              break;
            }
            case 'E': {
              player.direction = 'S';
              break;
            }
            case 'O': {
              player.direction = 'N';
              break;
            }
          }
          break;
        }
      }
    }
    return returnedBoard;
  }

  updateScore(location: string): number {
    const returnedLocation = location;
    let score = 0;
    if (returnedLocation.includes('T - ')) {
      const treasureString = returnedLocation.includes('/') ? returnedLocation.substr(0, returnedLocation.indexOf('/')) : location;
      const lineElements = treasureString.split('-');
      const retrievedTreasureScore = +lineElements[3];
      if (retrievedTreasureScore > 0) {
        score++;
      }
    }
    return score;
  }

  updateOldBoardLocation(location: string): string {
    let returnedLocation = location;

    if (returnedLocation.includes('T - ')) {
      const treasureString = returnedLocation.includes('/') ? returnedLocation.substr(0, returnedLocation.indexOf('/')) : location;
      const lineElements = treasureString.split('-');
      const treasureHorizontalLocation = +lineElements[1];
      const treasureVerticalLocation = +lineElements[2];
      const treasureScore = +lineElements[3];
      returnedLocation = 'T - ' + treasureHorizontalLocation + ' - ' + treasureVerticalLocation + ' - '
        + treasureScore;
    } else {
      returnedLocation = 'X';
    }
    return returnedLocation;
  }

  updateNewBoardLocation(location: string, player: Player): string {
    let returnedLocation = location;

    if (returnedLocation.includes('T - ')) {
      const treasureString = returnedLocation.includes('/') ? returnedLocation.substr(0, returnedLocation.indexOf('/')) : location;
      const lineElements = treasureString.split('-');
      const treasureHorizontalLocation = +lineElements[1];
      const treasureVerticalLocation = +lineElements[2];
      let treasureScore = +lineElements[3];
      treasureScore = +lineElements[3] > 0 ? --treasureScore : 0;
      returnedLocation = (treasureScore === 0 ? '' : 'T - ' + treasureHorizontalLocation
        + ' - ' + treasureVerticalLocation + ' - ' + treasureScore + '/') + 'A - ' + player.name + ' - '
        + player.playerHorizontalLocation + ' - ' + player.playerVerticalLocation + ' - '
        + player.direction + ' - ' + player.score;
    } else {
      returnedLocation = 'A - ' + player.name + ' - ' + player.playerHorizontalLocation + ' - ' + player.playerVerticalLocation + ' - '
        + player.direction + ' - ' + player.score;
    }
    return returnedLocation;
  }

  checkMoveValidity(board: Array<Array<string>>, playerVerticalLocation: number, playerHorizontalLocation: number): boolean {
    let warningOnBoard = false;
    let warningOnMountain = false;
    let isMoveValid = true;

    if (board[playerVerticalLocation][playerHorizontalLocation].includes('M')) {
      warningOnMountain = true;
    }

    if (playerHorizontalLocation > board.length || playerHorizontalLocation < 0
      || playerVerticalLocation > board[0].length || playerVerticalLocation < 0) {
      warningOnBoard = true;
    }

    if (warningOnBoard || warningOnMountain) {
      isMoveValid = false;
    }

    return isMoveValid;
  }
}
