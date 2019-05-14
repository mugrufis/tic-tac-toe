import { TestBed } from '@angular/core/testing';

import { CheckWinConditionsService } from './check-win-conditions.service';
import {IBoardCoordinates} from "../Interfaces/IBoardCoordinates";

describe('CheckWinConditionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  const drawnGame = ['X','O','X','O','X','O','O','X','O'];

  const wonVertical = ['O','O','X','O','X','O','O','X','O'];

  const horizontalGame = ['X','X','X','X','X',
                           'X','X','O','O','O',
                           'O','O','O','O','O',
                           'X','X','O','O','O',
                           undefined,,'O','O','O'];

  const notWin = [,,,'X','O','O','X','O'];


  const boardCoordinates: IBoardCoordinates = {
    boardStatus: drawnGame,
    selectedRow: 2,
    selectedColumn:2,
    boardDimensions:3
  };

  it('should be created', () => {
    const service: CheckWinConditionsService = TestBed.get(CheckWinConditionsService);
    expect(service).toBeTruthy();
  });

  it('should identify when win condition is met', () => {
    const service: CheckWinConditionsService = TestBed.get(CheckWinConditionsService);

    expect(service.checkWinConditions(boardCoordinates)).toBeFalsy();

    boardCoordinates.boardStatus = wonVertical;
    boardCoordinates.selectedColumn = 0;
    expect(service.checkWinConditions(boardCoordinates)).toEqual([0,3,6]);

    boardCoordinates.boardDimensions = 5;
    boardCoordinates.boardStatus = horizontalGame;
    boardCoordinates.selectedRow = 4;
    for (let i = 0; i < 5; i++) {
      boardCoordinates.selectedColumn = i;
      expect(service.checkWinConditions(boardCoordinates)).toBeFalsy();
    }

    boardCoordinates.boardDimensions = 5;
    boardCoordinates.boardStatus = notWin;
    boardCoordinates.selectedRow = 2;
    boardCoordinates.selectedColumn = 0;
    expect(service.checkWinConditions(boardCoordinates)).toBeFalsy();

  });
});
