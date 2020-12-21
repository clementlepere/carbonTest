import { Instruction } from './instruction';
import { Map } from '../../models/Map/map';

export class TurnInstruction extends Instruction {
  //   private turnFunction(): Action<Adventurer>;
  // initialisé par le constructeur. Action<Adventurer> est juste une méthode qui retourne rien et prend un aventurier en param .

  public execute(map: Map): Map {
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
    return map;
  }
}
