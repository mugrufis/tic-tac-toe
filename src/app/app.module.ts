import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlaysquareComponent } from './components/playsquare/playsquare.component';
import { BoardConstructorComponent } from './components/board-constructor/board-constructor.component';
import {CheckWinConditionsService} from "./services/check-win-conditions.service";


@NgModule({
  declarations: [
    AppComponent,
    PlaysquareComponent,
    BoardConstructorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CheckWinConditionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
