import {Component, Input, OnInit} from '@angular/core';
import {IPlayer} from "../../Interfaces/IPlayer";
import {IBoardCoordinates} from "../../Interfaces/IBoardCoordinates";
import {CheckWinConditionsService} from "../../services/check-win-conditions.service";

@Component({
  selector: 'app-board-constructor',
  templateUrl: './board-constructor.component.html',
  styleUrls: ['./board-constructor.component.css']
})
export class BoardConstructorComponent implements OnInit {
  @Input()
  public set boardDimentions(newValue) {
    this._boardDimentions = newValue;
    if (!newValue || newValue % 2 !== 1 || newValue === 1) {
      this.boardStatus = [];
      this.rows = [];
      console.error('An odd value greater than 1 is needed to displaye the board.');
      return;
    }
    this.rows = new Array(newValue);
  }

  public get boardDimentions() {
    return this._boardDimentions;
  }

  private _boardDimentions;
  private playerOne: IPlayer;
  private playerTwo: IPlayer;
  private currentPlayer: IPlayer;
  private elementsToPaint: number[];


  // A hack to generate an array with the correct number of indexes for the ngfor to work.
  // Used because the boardStatus array often changes and the board would be redraw every time.
  private rows = [];
  // A string array representing the board. Numbers go letft to right top to bottom
  private boardStatus: string[] = [];

  constructor(
    private checkWinConditionsService: CheckWinConditionsService
  ) {
  }

  ngOnInit() {
    this.generatePlayers();
    this.assignRandomPlayerToStart();
  }

  private onSquareClick(selectedRow, selectedColumn) {
    if (!this.currentPlayer) {
      return;
    }

    if (this.boardStatus[selectedRow * this.boardDimentions + selectedColumn]) {
      //  Symbols in squares can not be ovewritten.
      return;
    }

    // Mark the selected square
    this.boardStatus[selectedRow * this.boardDimentions + selectedColumn] = this.currentPlayer.mark;

  this.onPlayerPlayed({
    boardStatus: this.boardStatus,
    selectedColumn: selectedColumn,
    selectedRow: selectedRow,
    boardDimensions: this.boardDimentions
  })
  }

  private resetBoard() {
    this.boardStatus = [];
  }

  private generatePlayers() {
    this.playerOne = {
      mark: 'X',
      wins: 0
    };

    this.playerTwo = {
      mark: 'O',
      wins: 0
    };

  }

  private onPlayerPlayed(boardCoordinates: IBoardCoordinates) {
    this.elementsToPaint = this.checkWinConditionsService.checkWinConditions(boardCoordinates);

    // If someone wins add a point to the total wins reset and the board
    if (this.elementsToPaint) {
      this.currentPlayer.wins++;
      this.currentPlayer = undefined;
      setTimeout(()=>{
        this.resetBoard();
        this.assignNextPlayer();
      }, 800);
      return;
    }

    // If the game is a draw the starting player is random again
    if (boardCoordinates.boardStatus.join('').length === (boardCoordinates.boardDimensions * boardCoordinates.boardDimensions)) {
      setTimeout(()=>{
        this.resetBoard();
        this.assignRandomPlayerToStart();
      }, 800);
      return;
    }

    // Next PLayer is up
    this.assignNextPlayer();

  }

  private getRandomPlayer(): IPlayer {
    return (Math.floor(Math.random() * 2) + 1) == 1 ? this.playerOne : this.playerTwo;
  }

  private findNextPlayer(): IPlayer {
    if (this.currentPlayer === this.playerOne) {
      return this.playerTwo;
    }
    return this.playerOne;
  }

  private assignNextPlayer() {
    this.currentPlayer = this.findNextPlayer();
  }

  private assignRandomPlayerToStart() {
    this.currentPlayer = this.getRandomPlayer();
  }
}
