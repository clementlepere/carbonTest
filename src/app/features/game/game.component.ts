import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Player } from '@shared/models/player/player';
import { Board } from '@shared/models/board/board';
import { Mountain } from '@shared/models/mountain/mountain';
import { Treasure } from '@shared/models/treasure/treasure';
import { PlayerService } from '@core/services/player/player.service';
import { MountainService } from '@core/services/mountain/mountain.service';
import { TreasureService } from '@core/services/treasure/treasure.service';
import { BoardService } from '@core/services/board/board.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  // providers: [PlayerService, MountainService, TreasureService, BoardService]
})

export class GameComponent implements OnInit {

  fileText;

  board: Board;
  mountains: Mountain[];
  players: Player[];
  treasures: Treasure[];

  constructor(
    private toastr: ToastrManager, private playerService: PlayerService, private mountainService: MountainService,
    private treasureService: TreasureService, private boardService: BoardService
  ) {
    this.players = Array<Player>();
    this.mountains = Array<Mountain>();
    this.treasures = Array<Treasure>();
  }

  ngOnInit() { }

  fileUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    reader.onloadend = (e) => {
      console.log('reader', reader.result);
      this.fileText = reader.result;
    };
  }

  startGame() {
    if (this.fileText !== undefined && typeof (this.fileText) === 'string') {
      console.log('fileText: ', this.fileText.split('\n'));
      const parsedFileText = Array<string>();
      Object.assign(parsedFileText, this.fileText.split('\n'));
      this.initBoard(parsedFileText);
    } else {
      this.toastr.errorToastr('The array is empty');
    }
  }

  initBoard(fileText: string[]) {
    fileText.forEach(line => {
      console.log('line', line);
      this.createBoardFromLine(line);
    });
    console.log('players', this.players);
    console.log('board', this.board);
    console.log('treasures', this.treasures);
    console.log('mountains', this.mountains);
  }

  createBoardFromLine(line: string) {
    console.log(line.charAt(0));
    switch (line.charAt(0)) {
      case 'M': {
        this.mountains.push(this.mountainService.createMountain(line));
        break;
      }
      case 'T': {
        this.treasures.push(this.treasureService.createTreasure(line));
        break;
      }
      case 'A': {
        this.players.push(this.playerService.createPlayer(line));
        break;
      }
      case 'C': {
        this.board = this.boardService.createBoard(line);
        break;
      }
    }
  }
}




