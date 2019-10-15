import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlaysquareComponent } from './components/playsquare/playsquare.component';
import { BoardConstructorComponent } from './components/board-constructor/board-constructor.component';
import {CheckWinConditionsService} from './services/check-win-conditions.service';
import { GameOptionsComponent } from './components/game-options/game-options.component';
import {EasyComputerAIService} from './services/computerAI/easy-computer-ai.service';
import {NormalComputerAIService} from './services/computerAI/normal-computer-ai.service';
import {UnbeatableComputerAIService} from './services/computerAI/unbeatable-computer-ai.service';

@NgModule({
  declarations: [
    AppComponent,
    PlaysquareComponent,
    BoardConstructorComponent,
    GameOptionsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CheckWinConditionsService,
    EasyComputerAIService,
    NormalComputerAIService,
    UnbeatableComputerAIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
