import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Board } from '../board';
import { BoardService } from './board.service';

// set game constants
const NUM_PLAYERS = 2;
const BOARD_SIZE = 6;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService]
})

export class BoardComponent implements OnInit {

  fileText;
  canPlay = true;
  player = 0;

  constructor(
    private toastr: ToastrManager,
    private boardService: BoardService
  ) {
    // this.createBoards();
  }

  fileUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    reader.onloadend = (e) => {
      console.log(reader.result);
      this.fileText = reader.result;
      console.log('end');
    };
  }

  checkValidHit(boardId: number, tile: any): boolean {
    if (boardId == this.player) {
      this.toastr.errorToastr('Don\'t commit suicide.', 'You can\'t hit your own board.');
      return false;
    }
    if (this.winner) {
      this.toastr.errorToastr('Game is over');
      return false;
    }
    if (!this.canPlay) {
      this.toastr.errorToastr('A bit too eager.', 'It\'s not your turn to play.');
      return false;
    }
    if (tile.value == 'X') {
      this.toastr.errorToastr('Don\'t waste your torpedos.', 'You already shot here.');
      return false;
    }
    return true;
  }

  createBoards() {
    for (let i = 0; i < NUM_PLAYERS; i++) {
      this.boardService.createBoard(BOARD_SIZE);
    }
  }

  // winner property to determine if a user has won the game.
  // once a user gets a score higher than the size of the game
  // board, he has won.
  get winner(): Board {
    return this.boards.find(board => board.player.score >= BOARD_SIZE);
  }

  // get all boards and assign to boards property
  get boards(): Board[] {
    return this.boardService.getBoards();
  }
  ngOnInit() {
  }

}
