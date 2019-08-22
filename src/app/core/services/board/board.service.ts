import { Injectable } from '@angular/core';
import { Board } from '@shared/models/board/board';

@Injectable()
export class BoardService {

  constructor() { }

  createBoard(line: string) {
    const lineElements = line.split('- ');
    const boardHorizontalLocation = +lineElements[1];
    const boardVerticalLocation = +lineElements[2];
    return new Board(boardHorizontalLocation, boardVerticalLocation);
  }

}
