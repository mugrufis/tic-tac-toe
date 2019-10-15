import {Component} from '@angular/core';
import {IGameOptions} from './Interfaces/IGameOptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public gameOptions: IGameOptions;
  public showOptions = true;

  public onStartGame(gameOptions: IGameOptions) {
    this.gameOptions = gameOptions;
    this.showOptions = false;
  }

  public onShowOptions() {
    this.showOptions = true;
    this.gameOptions = undefined;
  }
}
