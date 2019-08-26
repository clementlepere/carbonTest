import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import * as _ from 'lodash';
import { cloneDeep } from 'lodash';
import * as saveAs from 'file-saver';

import { Player } from '@shared/models/player/player';
import { Board } from '@shared/models/board/board';
import { Mountain } from '@shared/models/mountain/mountain';
import { Treasure } from '@shared/models/treasure/treasure';
import { GameService } from './game.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [GameService]
})

export class GameComponent implements OnInit {

  fileText;
  textArea;

  board: Board;
  boardCreated = true;
  numberOfBoards = 0;

  mountains = Array<Mountain>();
  montainsCreated = true;

  players = Array<Player>();
  checkedlPlayerMoves = Array<Player>();
  playersCreated = true;
  playersOutput = Array<Player>();
  playerOutputString = Array<string>();

  treasures = Array<Treasure>();
  treasuresCreated = true;

  finalOutput = Array<string>();

  constructor(
    private toastr: ToastrService, private gameService: GameService, private ngZone: NgZone
  ) { }

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  ngOnInit() { }

  fileUpload(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    this.autosize.reset();
    if (file) {
      reader.readAsText(file);
      reader.onloadend = () => {
        this.fileText = reader.result;
        this.ngZone.onStable.pipe(take(1))
          .subscribe(() => this.autosize.resizeToFitContent(true));
      };
    } else {
      this.toastr.error('The array is empty');
      throw new Error('The array is empty');
    }
  }

  startGame() {
    this.resetGame();
    if (this.fileText !== undefined && typeof (this.fileText) === 'string') {
      const parsedFileText = Array<string>();
      Object.assign(parsedFileText, this.fileText.split('\n'));
      this.initGameLoop(parsedFileText);
    } else {
      this.toastr.error('The array is empty');
      throw new Error('The array is empty');
    }
  }

  createBoardFromTextLine(line: string) {
    switch (line.charAt(0)) {
      case 'M': {
        this.mountains.push(this.createMountain(line));
        break;
      }
      case 'T': {
        this.treasures.push(this.createTreasure(line));
        break;
      }
      case 'A': {
        this.players.push(this.createPlayer(line));
        break;
      }
      case 'C': {
        if (this.numberOfBoards === 0) {
          this.board = this.createBoard(line);
          this.numberOfBoards++;
        } else {
          this.toastr.error('There is more than one board input');
          throw new Error('There is more than one board input');
        }
        break;
      }
    }
  }

  createMountain(line: string): Mountain {
    const lineElements = line.split('- ');
    const mountainHorizontalLocation = +lineElements[1];
    const mountainVerticalLocation = +lineElements[2];

    if (mountainHorizontalLocation < 0 || mountainVerticalLocation < 0) {
      this.montainsCreated = false;
    }

    if (this.montainsCreated === false) {
      this.toastr.error('Eror on montains creation');
      throw new Error('Eror on montains creation');
    } else {
      return new Mountain(mountainHorizontalLocation, mountainVerticalLocation);
    }
  }

  createPlayer(line: string): Player {
    const lineElements = line.split('- ');
    const name = lineElements[1].trim();
    const playerHorizontalLocation = +lineElements[2];
    const playerVerticalLocation = +lineElements[3];
    const direction = lineElements[4].trim();
    const path = lineElements[5].trim();

    if (playerHorizontalLocation < 0 || playerVerticalLocation < 0 || name.length < 0 || direction.length < 0 || path.length < 0) {
      this.playersCreated = false;
    }

    if (this.playersCreated === false) {
      this.toastr.error('Eror on players creation');
      throw new Error('Eror on montain location');
    } else {
      return new Player(name, playerHorizontalLocation, playerVerticalLocation, direction, path);
    }
  }

  createTreasure(line: string): Treasure {
    const lineElements = line.split('- ');
    const treasureHorizontalLocation = +lineElements[1];
    const treasureVerticalLocation = +lineElements[2];
    const score = +lineElements[3].trim();

    if (treasureHorizontalLocation < 0 || treasureVerticalLocation < 0) {
      this.treasuresCreated = false;
    }

    if (this.treasuresCreated === false) {
      this.toastr.error('Eror on treasures creation');
      throw new Error('Eror on treasures creation');
    } else {
      return new Treasure(treasureHorizontalLocation, treasureVerticalLocation, score);
    }
  }

  createBoard(line: string): Board {
    const lineElements = line.split('- ');
    const boardHorizontalLocation = +lineElements[1];
    const boardVerticalLocation = +lineElements[2];

    if (boardHorizontalLocation <= 0 || boardVerticalLocation <= 0) {
      this.boardCreated = false;
    }

    if (this.boardCreated === false) {
      this.toastr.error('Eror on board creation');
      throw new Error('Eror on board creation');
    } else {
      return new Board(boardHorizontalLocation, boardVerticalLocation);
    }
  }

  resetGame() {
    this.players.length = 0;
    this.mountains.length = 0;
    this.treasures.length = 0;

    this.finalOutput.length = 0;
    this.numberOfBoards = 0;
  }

  initGameLoop(fileText: string[]) {
    fileText.forEach(line => {
      console.log('line', line);
      this.createBoardFromTextLine(line);
    });

    const treasuresCopy = _.cloneDeep(this.treasures);
    this.players.forEach(player => {
      const playerMovesBeforeCheck = this.gameService.movePlayer(player);
      const checkedPlayerMoves = (this.checkPlayerMoves(playerMovesBeforeCheck, this.board, this.mountains));
      const finalScore = this.gameService.getPlayerScore(checkedPlayerMoves, treasuresCopy);

      checkedPlayerMoves[checkedPlayerMoves.length - 1].finalScore = finalScore;
      this.playersOutput.push(checkedPlayerMoves[checkedPlayerMoves.length - 1]);
    });

    this.finalOutput.push('C - ' + this.board.width + ' - ' + this.board.height + '\n');
    treasuresCopy.forEach(treasure => {
      this.finalOutput.push('T - ' + treasure.treasureHorizontalLocation + ' - ' + treasure.treasureVerticalLocation + ' - '
        + treasure.score + '\n');
    });

    this.mountains.forEach(mountain => {
      this.finalOutput.push('M - ' + mountain.mountainHorizontalLocation + ' - ' + mountain.mountainVerticalLocation + '\n');
    });

    this.playersOutput.forEach(player => {
      this.finalOutput.push('A - ' + player.name + ' - ' + player.playerHorizontalLocation + ' - '
        + player.playerVerticalLocation + ' - ' + player.finalScore + '\n');
    });

    const file = new Blob(this.finalOutput, { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'carbonTestOutPut.txt');
  }

  checkPlayerMoves(playerMoves: Player[], board: Board, mountains: Mountain[]): Player[] {
    let moveNumber = 0;

    const checkedlPlayerMoves = Array<Player>();
    playerMoves.forEach(playerMove => {
      let warningOnBoard = false;
      let warningOnMountain = false;

      mountains.forEach(mountain => {
        if (playerMove.playerHorizontalLocation === mountain.mountainHorizontalLocation
          && playerMove.playerVerticalLocation === mountain.mountainVerticalLocation) {
          this.toastr.warning('The move number: ' + moveNumber + ' meets a mountain');
          warningOnMountain = true;
        }
      });

      if (playerMove.playerHorizontalLocation > board.width || playerMove.playerHorizontalLocation < 0
        || playerMove.playerVerticalLocation > board.height || playerMove.playerVerticalLocation < 0) {
        this.toastr.warning('The move number: ' + moveNumber + ' is out of the board');
        warningOnBoard = true;
      }

      if (warningOnBoard === false && warningOnMountain === false) {
        checkedlPlayerMoves.push(playerMove);
        moveNumber++;
      }
    });

    return checkedlPlayerMoves;
  }

}

