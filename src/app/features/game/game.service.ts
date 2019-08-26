import { Player } from '@shared/models/player/player';
import { Board } from '@shared/models/board/board';
import { Mountain } from '@shared/models/mountain/mountain';
import { Treasure } from '@shared/models/treasure/treasure';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { cloneDeep } from 'lodash';
@Injectable()
export class GameService {

  constructor() { }

  movePlayer(player: Player): Player[] {
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
    return playerMoves;
  }

  getPlayerScore(playerMoves: Player[], treasures: Treasure[]): number {
    let finalScore = 0;
    let playerCount = 0;

    const playerMovesCopy = _.cloneDeep(playerMoves);

    playerMovesCopy.forEach(playerMove => {
      treasures.forEach(treasure => {
        if (playerMove.playerHorizontalLocation === treasure.treasureHorizontalLocation
          && playerMove.playerVerticalLocation === treasure.treasureVerticalLocation
          && playerMove.path.charAt(playerCount) === 'A' && treasure.score > 0) {
          finalScore++;
          treasure.score--;
        }
      });
      playerCount++;
    });
    return finalScore;
  }
}
