import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IPlayer} from '../../Interfaces/IPlayer';
import {IBoardCoordinates} from '../../Interfaces/IBoardCoordinates';
import {CheckWinConditionsService} from '../../services/check-win-conditions.service';
import {IGameOptions} from '../../Interfaces/IGameOptions';
import {EasyComputerAIService} from '../../services/computerAI/easy-computer-ai.service';
import {NormalComputerAIService} from '../../services/computerAI/normal-computer-ai.service';
import {UnbeatableComputerAIService} from '../../services/computerAI/unbeatable-computer-ai.service';

@Component({
  selector: 'app-board-constructor',
  templateUrl: './board-constructor.component.html',
  styleUrls: ['./board-constructor.component.css']
})
export class BoardConstructorComponent implements OnInit, OnChanges {
  @Input()
  public gameOptions: IGameOptions;

  // A string array representing the board. Numbers go letft to right top to bottom
  private currentBoardOverview: string[] = [];

  private playerOne: IPlayer;
  private playerTwo: IPlayer;
  private currentPlayer: IPlayer;

  // Used to update the UI
  // noinspection JSMismatchedCollectionQueryUpdate
  private winningGroupIndexes: number[];

  // A hack to generate an array with the correct number of indexes for the ngfor to work.
  // Basing the html layout on rows instead of currentBoardOverview is done
  // to remove the redrawing of the board that would occur by each change of currentBoardOverview
  private rows = [];

  constructor(
    private checkWinConditionsService: CheckWinConditionsService,
    private easyComputerAIService: EasyComputerAIService,
    private normalComputerAIService: NormalComputerAIService,
    private unbeatableComputerAIService: UnbeatableComputerAIService
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.gameOptions.currentValue) {
      return;
    }

    this.rows = new Array(Number(this.gameOptions.boardDimentions));

    for (let i = 0; i < this.gameOptions.boardDimentions * this.gameOptions.boardDimentions; i++) {
      this.currentBoardOverview[i] = i + '';
    }

    this.setupGame();
  }

  private setupGame() {
    this.generatePlayers();
    this.makePlayerComputerIfSinglePlayerGame();
    this.assignRandomPlayerToStart();
  }

  private onSquareClick(selectedIndex) {
    if (!this.currentPlayer) {
      return;
    }

    if (this.currentBoardOverview[selectedIndex] === 'O'
      || this.currentBoardOverview[selectedIndex] === 'X' ) {
      console.log('Symbols in squares can not be ovewritten.');
      return;
    }

    this.currentBoardOverview[selectedIndex] = this.currentPlayer.mark;

    this.onPlayerPlayed({
      boardStatus: this.currentBoardOverview,
      selectedIndex,
      boardDimensions: this.gameOptions.boardDimentions
    });
  }

  private resetBoard() {
    for (let i = 0; i < this.gameOptions.boardDimentions * this.gameOptions.boardDimentions; i++) {
      this.currentBoardOverview[i] = i + '';
    }
  }

  private generatePlayers() {
    this.playerOne = {
      mark: 'X',
      wins: 0,
      computer: false
    };

    this.playerTwo = {
      mark: 'O',
      wins: 0,
      computer: false
    };
  }

  private makePlayerComputerIfSinglePlayerGame() {
    this.getRandomPlayer().computer = this.isThisAComputerPlayer();
  }

  private isThisAComputerPlayer(): boolean {
    return this.gameOptions.numberOfPlayers === 1;
  }


  public onPlayerPlayed(boardCoordinates
                          :
                          IBoardCoordinates
  ) {
    this.winningGroupIndexes = this.checkWinConditionsService.checkWinConditions(boardCoordinates);

    // If someone wins add a point to the total wins reset and the board
    if (this.winningGroupIndexes) {
      this.currentPlayer.wins++;
      this.currentPlayer = undefined;
      setTimeout(() => {
        this.resetBoard();
        this.assignNextPlayer();
      }, 800);
      return;
    }

    // If the game is a draw the starting player is random again
    if (this.checkWinConditionsService.checkForDraw(boardCoordinates)) {
      setTimeout(() => {
        this.resetBoard();
        this.assignRandomPlayerToStart();
      }, 800);
      return;
    }

    // Next PLayer is up
    this.assignNextPlayer();

  }

  private getRandomPlayer(): IPlayer {
    return (Math.floor(Math.random() * 2) + 1) === 1 ? this.playerOne : this.playerTwo;
  }

  private findNextPlayer(): IPlayer {
    if (this.currentPlayer === this.playerOne) {
      return this.playerTwo;
    }
    return this.playerOne;
  }

  private assignNextPlayer() {
    this.currentPlayer = this.findNextPlayer();

    if (this.currentPlayer.computer) {
      this.onSquareClick(this.playComputerMove());
    }
  }

  private assignRandomPlayerToStart() {
    this.currentPlayer = this.getRandomPlayer();

    if (this.currentPlayer.computer) {
      this.onSquareClick(this.playComputerMove());
    }
  }

  private playComputerMove(): number {
    switch (+this.gameOptions.computerLevel) {
      case 1:
        return this.easyComputerAIService.getComputerMove(this.currentBoardOverview);
      case 2:
        return this.normalComputerAIService.getComputerMove(this.currentBoardOverview);
      case 3:
        return this.unbeatableComputerAIService.getComputerMove(this.currentBoardOverview);
      default:
        console.error('This computer difficulty level does not exist');
        return;
    }
  }
}
