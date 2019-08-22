import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Player } from '@shared/models/player/player';
import { Board } from '@shared/models/board/board';
import { Mountain } from '@shared/models/mountain/mountain';
import { Treasure } from '@shared/models/treasure/treasure';
import { GameService } from './game.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [GameService]
})

export class GameComponent implements OnInit {

  fileText;

  board: Board;
  boardCreated = true;

  mountains: Mountain[];
  montainsCreated = true;

  players: Player[];
  playersCreated = true;

  treasures: Treasure[];
  treasuresCreated = true;

  constructor(
    private toastr: ToastrService, private gameService: GameService
  ) {
    this.players = Array<Player>();
    this.mountains = Array<Mountain>();
    this.treasures = Array<Treasure>();
  }

  ngOnInit() { }

  fileUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    reader.onloadend = () => {
      this.fileText = reader.result;
    };
  }

  startGame() {
    this.resetGame();
    if (this.fileText !== undefined && typeof (this.fileText) === 'string') {
      console.log('fileText: ', this.fileText.split('\n'));
      const parsedFileText = Array<string>();
      Object.assign(parsedFileText, this.fileText.split('\n'));
      this.initBoard(parsedFileText);
    } else {
      this.toastr.error('The array is empty');
      throw new Error('The array is empty');
    }
  }

  initBoard(fileText: string[]) {
    fileText.forEach(line => {
      console.log('line', line);
      this.createBoardFromLine(line);
    });

    console.log('players', this.players);
    this.players.forEach(player => {
      this.gameService.movePlayer(player);
    });
    console.log('board', this.board);
    console.log('treasures', this.treasures);
    console.log('mountains', this.mountains);
  }

  createBoardFromLine(line: string) {
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
        this.createBoard(line);
        break;
      }
    }
  }

  createMountains(line: string) {
    const lineElements = line.split('- ');
    const mountainHorizontalLocation = +lineElements;
    const mountainVerticalLocation = +lineElements;

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
  }

}

