import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

import { Board } from '@shared/models/board/board';
import { Player } from '@shared/models/player/player';
import Utils from '@shared/utils/Utils';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})

export class GameComponent implements OnInit {

  fileText: string | ArrayBuffer;
  textArea: string;

  board = Array<Array<string>>();
  boardCreated = true;
  numberOfBoards = 0;

  montainsCreated = true;

  players = Array<Player>();
  checkedlPlayerMoves = Array<Player>();
  playersCreated = true;
  playersOutput = Array<Player>();
  playerOutputString = Array<string>();

  treasuresCreated = true;

  finalOutput: string;

  constructor(
    private toastr: ToastrService, private gameService: GameService, private ngZone: NgZone,
    private utils: Utils
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

  initializeBoard(line: string) {
    switch (line.charAt(0)) {
      case 'M': {
        Object.assign(this.board, this.addMountain(this.board, line));
        break;
      }
      case 'T': {
        Object.assign(this.board, this.addTreasures(this.board, line));
        break;
      }
      case 'A': {
        Object.assign(this.board, this.addPlayer(this.board, line));
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

  addMountain(board: Array<Array<string>>, line: string): Array<Array<string>> {
    const lineElements = line.split('- ');
    const mountainHorizontalLocation = +lineElements[1];
    const mountainVerticalLocation = +lineElements[2];
    const returnedBoard = board;

    if (mountainHorizontalLocation > board.length || mountainHorizontalLocation < 0
      || mountainVerticalLocation > board[0].length || mountainVerticalLocation < 0) {
      this.montainsCreated = false;
    }

    if (this.montainsCreated === false) {
      this.toastr.error('Error on mountain creation');
      throw new Error('Error on mountain creation');
    } else {
      returnedBoard[mountainVerticalLocation][mountainHorizontalLocation] = 'M' + ' - ' + mountainHorizontalLocation + ' - '
        + mountainVerticalLocation;
      return returnedBoard;
    }
  }

  addPlayer(board: Array<Array<string>>, line: string): Array<Array<string>> {
    const lineElements = line.split('- ');
    const name = lineElements[1].trim();
    const playerHorizontalLocation = +lineElements[2];
    const playerVerticalLocation = +lineElements[3];
    const direction = lineElements[4].trim();
    const path = lineElements[5].trim();
    const returnedBoard = board;

    this.players.push(new Player(name, playerHorizontalLocation, playerVerticalLocation, direction, path, 0));

    if (playerHorizontalLocation > board.length || playerHorizontalLocation < 0
      || playerVerticalLocation > board[0].length || playerVerticalLocation < 0
      || name.length < 0 || direction.length < 0 || path.length < 0
      || board[playerVerticalLocation][playerHorizontalLocation] === 'M') {
      this.playersCreated = false;
    }

    if (this.playersCreated === false) {
      this.toastr.error('Error on player creation');
      throw new Error('Error on player creation');
    } else {
      this.players.forEach(player => {
        returnedBoard[playerVerticalLocation][playerHorizontalLocation] = 'A - ' + player.name + ' - '
          + player.playerHorizontalLocation + ' - ' + player.playerVerticalLocation + ' - '
          + player.direction + ' - ' + player.score;
      });
      return returnedBoard;
    }
  }

  addTreasures(board: Array<Array<string>>, line: string): Array<Array<string>> {
    const returnedBoard = board;
    const lineElements = line.split('- ');
    const treasureHorizontalLocation = +lineElements[1];
    const treasureVerticalLocation = +lineElements[2];
    const score = +lineElements[3].trim();

    if (treasureHorizontalLocation < 0 || treasureVerticalLocation < 0) {
      this.treasuresCreated = false;
    }

    if (!this.treasuresCreated) {
      this.toastr.error('Error on treasure creation');
      throw new Error('Error on treasure creation');
    } else {
      returnedBoard[treasureVerticalLocation][treasureHorizontalLocation] = 'T - ' + treasureHorizontalLocation + ' - '
        + treasureVerticalLocation + ' - ' + score;
      return returnedBoard;
    }
  }

  createBoard(line: string): Array<Array<string>> {
    const lineElements = line.split('- ');
    const boardHorizontalLocation = +lineElements[1];
    const boardVerticalLocation = +lineElements[2];

    const board = new Board(boardHorizontalLocation, boardVerticalLocation);
    if (boardHorizontalLocation <= 0 || boardVerticalLocation <= 0) {
      this.boardCreated = false;
    }

    if (!this.boardCreated) {
      this.toastr.error('Error on board creation');
      throw new Error('Error on board creation');
    } else {
      return board.map;
    }
  }

  resetGame() {
    this.players.length = 0;

    this.finalOutput = '';
    this.numberOfBoards = 0;
  }

  initGameLoop(fileText: string[]) {
    fileText.forEach(line => {
      this.initializeBoard(line);
    });

    this.players.forEach(player => {
      this.board = _.cloneDeep(this.gameService.movePlayer(this.board, player));
    });

    const boardOutput = ('C - ' + this.board[0].length + ' - ' + this.board.length + '\n');
    const mountainOuput = this.utils.findValuesIn2DArray(this.board, 'M');
    const treasureStringList = this.utils.findValuesIn2DArray(this.board, 'T');
    const treasureOutput = new Array<string>();
    treasureStringList.forEach(treasureString => {
      treasureOutput.push(treasureString.includes('/') ?
        treasureString.substr(0, treasureString.indexOf('/')) : treasureString);
    });

    const playerOutput = this.utils.findValuesIn2DArray(this.board, 'A');

    this.finalOutput = boardOutput.concat(mountainOuput.join('\n') + '\n',
      treasureOutput.join('\n') + '\n', playerOutput.join('\n') + '\n');
  }

}

