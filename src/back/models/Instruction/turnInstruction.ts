import { Instruction } from './instruction';
import { Region } from '../Region/region';

export class TurnInstruction extends Instruction {
  public execute(region: Region): Region {
    switch (this.path) {
      case 'G': {
        switch (this.adventurer.direction) {
          case 'N': {
            this.adventurer.turn('O');
            break;
          }
          case 'S': {
            this.adventurer.turn('E');
            break;
          }
          case 'E': {
            this.adventurer.turn('N');
            break;
          }
          case 'O': {
            this.adventurer.turn('S');
          }
        }
        break;
      }
      case 'D': {
        switch (this.adventurer.direction) {
          case 'N': {
            this.adventurer.turn('E');
            break;
          }
          case 'S': {
            this.adventurer.turn('O');
            break;
          }
          case 'E': {
            this.adventurer.turn('S');
            break;
          }
          case 'O': {
            this.adventurer.turn('N');
            break;
          }
        }
        break;
      }
    }
    return region;
  }
}
