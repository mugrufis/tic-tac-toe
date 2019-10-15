import { Injectable } from '@angular/core';
import {IComputerAI} from '../../Interfaces/IComputerAI';

@Injectable({
  providedIn: 'root'
})
export class NormalComputerAIService implements IComputerAI {

  constructor() { }

  getComputerMove(currentBoardOverview: string[]) {
    return 0;
  }
}
