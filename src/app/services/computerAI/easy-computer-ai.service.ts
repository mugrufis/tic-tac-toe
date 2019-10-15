import {Injectable} from '@angular/core';
import {IComputerAI} from '../../Interfaces/IComputerAI';

@Injectable({
  providedIn: 'root'
})
export class EasyComputerAIService implements IComputerAI {

  getComputerMove(currentBoardOverview: string[]) {
    let randomIndex;
    do {
      randomIndex = currentBoardOverview[Math.floor(Math.random() * currentBoardOverview.length)];
    } while (randomIndex === 'O' || randomIndex === 'X');


    return +randomIndex;
  }

  constructor() {
  }
}
