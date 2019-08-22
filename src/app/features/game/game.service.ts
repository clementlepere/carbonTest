import { Injectable } from '@angular/core';
import { Board } from '@shared/models/board/board';
import { Player } from '@shared/models/player/player';

@Injectable()
export class GameService {

  constructor() { }

  movePlayer(player: Player) {
    const playerMoves = Array<Player>();
    const firstPlayer = new Player('', 0, 0, '', '');
    Object.assign(firstPlayer, player);
    playerMoves.push(firstPlayer);

    for (const move of firstPlayer.path) {
      const lastPlayer = new Player('', 0, 0, '', '');
      Object.assign(lastPlayer, playerMoves[playerMoves.length - 1]);
      switch (move) {
        case 'A': {
          switch (lastPlayer.direction) {
            case 'N': {
              lastPlayer.playerVerticalLocation--;
              break;
            }
            case 'S': {
              console.log('south');
              lastPlayer.playerVerticalLocation++;
              break;
            }
            case 'E': {
              lastPlayer.playerHorizontalLocation++;
              break;
            }
            case 'O': {
              lastPlayer.playerHorizontalLocation--;
              break;
            }
          }
          break;
        }
        case 'G': {
          switch (lastPlayer.direction) {
            case 'N': {
              lastPlayer.direction = 'O';
              break;
            }
            case 'S': {
              lastPlayer.direction = 'E';
              break;
            }
            case 'E': {
              lastPlayer.direction = 'N';
              break;
            }
            case 'O': {
              lastPlayer.direction = 'S';
            }
          }
          break;
        }
        case 'D': {
          switch (lastPlayer.direction) {
            case 'N': {
              lastPlayer.direction = 'E';
              break;
            }
            case 'S': {
              lastPlayer.direction = 'O';
              break;
            }
            case 'E': {
              lastPlayer.direction = 'S';
              break;
            }
            case 'O': {
              lastPlayer.direction = 'N';
              break;
            }
          }
          break;
        }
      }
      playerMoves.push(lastPlayer);
    }
    console.log('playerMoves', playerMoves);
  }
  // // method for creating a board which takes
  // // an optional size parameter that defaults to 5
  // createBoard(size: number = 5): GameService {
  //   // create tiles for board
  //   let tiles = [];
  //   for (let i = 0; i < size; i++) {
  //     tiles[i] = [];
  //     for (let j = 0; j < size; j++) {
  //       tiles[i][j] = { used: false, value: 0, status: '' };
  //     }
  //   }

  //   // generate random ships for the board
  //   for (let i = 0; i < size * 2; i++) {
  //     tiles = this.randomShips(tiles, size);
  //   }

  //   // create board
  //   const board = new Board({
  //     player: new Player({ id: this.playerId++ }),
  //     tiles
  //   });

  //   // append created board to `boards` property
  //   this.boards.push(board);
  //   return this;
  // }

  // // function to return the tiles after a value
  // // of 1 (a ship) is inserted into a random tile
  // // in the array of tiles
  // randomShips(tiles: Object[], len: number): Object[] {
  //   len = len - 1;
  //   const ranRow = this.getRandomInt(0, len), ranCol = this.getRandomInt(0, len);
  //   if (tiles[ranRow][ranCol].value === 1) {
  //     return this.randomShips(tiles, len);
  //   } else {
  //     tiles[ranRow][ranCol].value = 1;
  //     return tiles;
  //   }
  // }

  // // helper function to return a random
  // // integer between ${min} and ${max}
  // getRandomInt(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  // // returns all created boards
  // getBoards(): Board[] {
  //   return this.boards;
  // }
}
