import { Instruction } from './instruction';
import { Map } from '../../models/Map/map';

export class TurnInstruction extends Instruction {
  //   private turnFunction(): Action<Adventurer>;
  // initialisé par le constructeur. Action<Adventurer> est juste une méthode qui retourne rien et prend un aventurier en param .

  public execute(map: Map): Map {
    turnFunction(this.adventurer);
    return map;
  }
}
