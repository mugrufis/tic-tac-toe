import {Injectable} from '@angular/core';
import {IBoardCoordinates} from '../Interfaces/IBoardCoordinates';

@Injectable({
  providedIn: 'root'
})
export class CheckWinConditionsService {

  constructor() {
  }

  public checkForDraw(boardCoordinates: IBoardCoordinates): boolean {
    return !this.findNumberPresenceInTheArray(boardCoordinates.boardStatus);
  }

  private findNumberPresenceInTheArray(arr: string[]) {
    for (const item of arr) {
      if (Number(item)) {
        return true;
      }
    }
    return false;
  }

  public checkWinConditions(boardCoordinates: IBoardCoordinates): number[] {
    // todo if a player can not have enough marks to win return false
    // if (boardCoordinates.boardStatus.join('').length < boardCoordinates.boardDimensions * 2 - 1) {
    //   return;
    // }

    return this.checkWinHorizontal(boardCoordinates)
      || this.checkWinVertical(boardCoordinates)
      || this.checkWinDiagonallyRight(boardCoordinates)
      || this.checkWinDiagonallyLeft(boardCoordinates);
  }

  private checkWinHorizontal(boardCoordinates: IBoardCoordinates): number[] {
    const rowStartIndex: number = Math.floor(
      boardCoordinates.selectedIndex / boardCoordinates.boardDimensions) * boardCoordinates.boardDimensions;
    const rowElements: number[] = [];

    for (let i = rowStartIndex; i < boardCoordinates.boardDimensions + rowStartIndex; i++) {
      rowElements.push(i);
    }

    return this.checkIndexesForEquality(rowElements, boardCoordinates.boardStatus);
  }

  private checkWinVertical(boardCoordinates: IBoardCoordinates): number[] {
    const columnIndex: number = boardCoordinates.selectedIndex % boardCoordinates.boardDimensions;
    const columnElements: number[] = [];

    // boardCoordinates.boardDimensions ^ 2 does not work for some reason
    for (let i = columnIndex;
         i < (boardCoordinates.boardDimensions * boardCoordinates.boardDimensions);
         i += boardCoordinates.boardDimensions) {
      columnElements.push(i);
    }

    return this.checkIndexesForEquality(columnElements, boardCoordinates.boardStatus);
  }

  private checkWinDiagonallyLeft(boardCoordinates: IBoardCoordinates): number[] {
    const diagonalElementsLeft: number[] = [];
    for (let i = 0; i < (boardCoordinates.boardDimensions * boardCoordinates.boardDimensions); i += boardCoordinates.boardDimensions + 1) {
      diagonalElementsLeft.push(i);
    }
    return this.checkIndexesForEquality(diagonalElementsLeft, boardCoordinates.boardStatus);
  }

  private checkWinDiagonallyRight(boardCoordinates: IBoardCoordinates): number[] {
    const diagonalElementsRight: number[] = [];
    for (let i = boardCoordinates.boardDimensions - 1;
         i < (boardCoordinates.boardDimensions * boardCoordinates.boardDimensions) - 1;
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
