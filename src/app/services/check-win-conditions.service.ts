import { Injectable } from '@angular/core';
import {IBoardCoordinates} from '../Interfaces/IBoardCoordinates';

@Injectable({
  providedIn: 'root'
})
export class CheckWinConditionsService {

  constructor() { }

  public checkWinConditions(boardCoordinates: IBoardCoordinates): number[] {
    // if a player can not have enough marks to win return false
    if (boardCoordinates.boardStatus.join('').length < boardCoordinates.boardDimensions * 2 - 1) {
      return;
    }

    // if the clicked square is a diagonal one
    if (boardCoordinates.selectedColumn === boardCoordinates.selectedRow ||
      boardCoordinates.selectedRow + boardCoordinates.selectedColumn === boardCoordinates.boardDimensions - 1
    ) {
      return this.checkWinDiagonallyLeft(boardCoordinates)
        ||  this.checkWinHorizontal(boardCoordinates)
        || this.checkWinVertical(boardCoordinates)
        || this.checkWinDiagonallyRight(boardCoordinates);
    }

    // if the clicked square not diagonal one.
    return this.checkWinHorizontal(boardCoordinates) || this.checkWinVertical(boardCoordinates);
  }

  private checkWinHorizontal(boardCoordinates: IBoardCoordinates): number[] {
    const lineStartIndex: number = boardCoordinates.selectedRow * boardCoordinates.boardDimensions;

    // This can be done better but no internet connection to check how
    const lineElements: number[] = [];
    for (let i = lineStartIndex; i < boardCoordinates.boardDimensions + lineStartIndex; i++) {
      lineElements.push(i);
    }

    return this.checkIndexesForEquality(lineElements, boardCoordinates.boardStatus);
  }

  private checkWinVertical(boardCoordinates: IBoardCoordinates): number[] {
    // This can be done better but no internet connection to check how
    const columnElements: number[] = [];

    // boardCoordinates.boardDimensions ^ 2 does not work for some reason
    for (let i = boardCoordinates.selectedColumn;
         i < (boardCoordinates.boardDimensions * boardCoordinates.boardDimensions);
         i += boardCoordinates.boardDimensions) {
      columnElements.push(i);
    }

    return this.checkIndexesForEquality(columnElements, boardCoordinates.boardStatus);
  }

  private checkWinDiagonallyLeft(boardCoordinates: IBoardCoordinates): number[] {
    // This can be done better but no internet connection to check how
    const diagonalElementsLeft: number[] = [];
    for (let i = 0; i < (boardCoordinates.boardDimensions * boardCoordinates.boardDimensions ); i += boardCoordinates.boardDimensions + 1) {
      diagonalElementsLeft.push(i);
    }
    return this.checkIndexesForEquality(diagonalElementsLeft, boardCoordinates.boardStatus);
  }

  private checkWinDiagonallyRight(boardCoordinates: IBoardCoordinates): number[] {
    // This can be done better but no internet connection to check how
    const diagonalElementsRight: number[] = [];
    for (let i = boardCoordinates.boardDimensions - 1;
         i < (boardCoordinates.boardDimensions  * boardCoordinates.boardDimensions) - 1;
         i += boardCoordinates.boardDimensions - 1) {
      diagonalElementsRight.push(i);
    }
    return this.checkIndexesForEquality(diagonalElementsRight, boardCoordinates.boardStatus);
  }

  // noinspection JSMethodCanBeStatic
  private checkIndexesForEquality(indexes: number[], boardStatus: string[]): number[] {
    if (!indexes || indexes.length < 1 || !boardStatus) {
      return;
    }

    for (let i = 0; i < indexes.length - 1; i++) {
      if (boardStatus[indexes[i]] !== boardStatus[indexes[i + 1]]) {
        return;
      }
    }
    return indexes;
  }
}
