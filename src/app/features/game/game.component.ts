import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Player } from '@shared/models/player/player';
import { Board } from '@shared/models/board/board';
import { Mountain } from '@shared/models/mountain/mountain';
import { Treasure } from '@shared/models/treasure/treasure';
import { GameService } from './game.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

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

  treasures = Array<Treasure>();
  treasuresCreated = true;

  // myForm: FormGroup;

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
      this.initBoard(parsedFileText);
    } else {
      this.toastr.error('The array is empty');
      throw new Error('The array is empty');
    }
  }

  createBoardFromTextLine(line: string) {
    switch (line.charAt(0)) {
      case 'M': {
        this.createMountains(line);
        break;
      }
      case 'T': {
        this.createTreasure(line);
        break;
      }
      case 'A': {
        this.createPlayers(line);
        break;
      }
      case 'C': {
        if (this.numberOfBoards === 0) {
          this.createBoard(line);
          this.numberOfBoards++;
        } else {
          this.toastr.error('There is more than one board input');
          throw new Error('There is more than one board input');
        }
        break;
      }
    }
  }

  createMountains(line: string) {
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
      this.mountains.push(new Mountain(mountainHorizontalLocation, mountainVerticalLocation));
    }
  }

  createPlayers(line: string) {
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
      this.players.push(new Player(name, playerHorizontalLocation, playerVerticalLocation, direction, path));
    }
  }

  createTreasure(line: string) {
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
      this.treasures.push(new Treasure(treasureHorizontalLocation, treasureVerticalLocation, score));
    }
  }

  createBoard(line: string) {
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
      this.board = new Board(boardHorizontalLocation, boardVerticalLocation);
    }
  }

  resetGame() {
    this.players.length = 0;
    this.mountains.length = 0;
    this.treasures.length = 0;
    this.numberOfBoards = 0;
  }

  initBoard(fileText: string[]) {
    fileText.forEach(line => {
      console.log('line', line);
      this.createBoardFromTextLine(line);
    });

    this.players.forEach(player => {
      const playerMovesBeforeCheck = this.gameService.movePlayer(player);
      const checkedPlayerMoves = (this.checkPlayerMoves(playerMovesBeforeCheck, this.board, this.mountains));
      console.log('checkedPlayerMoves', checkedPlayerMoves);
    });

    console.log('board', this.board);
    console.log('treasures', this.treasures);
    console.log('mountains', this.mountains);
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

