import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-playsquare',
  templateUrl: './playsquare.component.html',
  styleUrls: ['./playsquare.component.css']
})
export class PlaysquareComponent implements OnInit {
  @Input() paint: boolean = false;
  @Input() set mark(newValue: string){
    this._mark = newValue;
    this.paint = false;
  }

  get mark() {
    return this._mark;
  }

  private _mark= '';

  constructor() { }

  ngOnInit() {
  }

}
