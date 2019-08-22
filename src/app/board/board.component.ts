import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Player } from '@app/shared/models/player/player';
import { Board } from '@app/shared/models/board/board';
import { Mountain } from '@app/shared/models/mountain/mountain';
import { Treasure } from '@app/shared/models/treasure/treasure';
import { BoardService } from './board.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService]
})

export class BoardComponent implements OnInit {

  fileText;
  players: Player[];
  board: Board;
  mountains: Mountain[];
  treasures: Treasure[];

  b: number;
  m: number;
  a: number;
  t: number;

  constructor(
    private toastr: ToastrManager,
  ) { }

  ngOnInit() {
    this.b = 0;
    this.m = 0;
    this.a = 0;
    this.t = 0;
  }

  fileUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    reader.onloadend = (e) => {
      console.log('reader', reader.result);
      this.fileText = reader.result;
    };
  }

  startGame() {
    if (this.fileText !== undefined && typeof (this.fileText)  === 'string' ) {
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
      this.getLineType(line);
    });
  }

  getLineType(line: string) {
    console.log(line.charAt(0));
    switch (line.charAt(0)) {
      case 'C': {
        const match = line.split('- ');
        console.log('board', match);
        // const mountainHorizontalLocation = line.charAt();
        // const mountainVerticalLocation: number;
        // this.mountains.push(new Mountain());
        break;
      }
      case 'M': {
        // this.m++;
        // console.log('mountain', this.m);
        // const mountainHorizontalLocation = line.charAt();
        // const mountainVerticalLocation: number;
        // this.mountains.push(new Mountain());
        break;
      }
      case 'T': {
        // this.t++;
        // console.log('treasure', this.t);
        // const mountainHorizontalLocation = line.charAt();
        // const mountainVerticalLocation: number;
        // this.mountains.push(new Mountain());
        break;
      }
      case 'A': {
        const match = line.split('- ');
        // this.a++;
        // console.log('player', this.a);
        // const mountainHorizontalLocation = line.charAt();
        // const mountainVerticalLocation: number;
        // this.mountains.push(new Mountain());
        break;
      }
    }
  }

  getStringElementFromLine(line: string) {
    const match = line.split('- ');
    console.log(match);
    match.forEach(char => {
      const variable = match[char];
      console.log(variable);
    });
  }

}




