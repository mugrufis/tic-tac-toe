import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IGameOptions} from '../../Interfaces/IGameOptions';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.css']
})
export class GameOptionsComponent implements OnInit {
  @Output()
  public startGame = new EventEmitter();

  public currentOptionsPage = 1;
  gameOptions: IGameOptions = {
    numberOfPlayers: undefined,
    boardDimentions: undefined,
    computerLevel: undefined
  };

  constructor() {
  }

  ngOnInit() {
  }



  private onSetNumberOfPlayers(numberOfPlayers: number) {
    this.gameOptions.numberOfPlayers = numberOfPlayers;
    this.goForward();
  }

  private onSetComputerLevel(event) {
    this.gameOptions.computerLevel = event.target.value;
    this.goForward();
  }

  private onSetBoardDimentions(event) {
    if (event.target.value <= 2) {
      return;
    }

    // the + turns the string value to a number.
    this.gameOptions.boardDimentions = +event.target.value;
    this.goForward();
  }

  private onStartGame() {
    this.startGame.emit(this.gameOptions);
  }

  public onGoBack() {
    this.currentOptionsPage -= 1;
  }

  private goForward() {
    this.currentOptionsPage += 1;
  }
}
