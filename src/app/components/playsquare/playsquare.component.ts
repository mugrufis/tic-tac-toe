import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-playsquare',
  templateUrl: './playsquare.component.html',
  styleUrls: ['./playsquare.component.css']
})
export class PlaysquareComponent implements OnInit {
  @Input() paint = false;

  @Input() set mark(newValue: string) {
    if (Number(newValue) || newValue === '0') {
      this._mark = '';
      return;
    }

    this._mark = newValue;
    this.paint = false;
  }

  get mark() {
    return this._mark;
  }

  // tslint:disable-next-line
  private _mark = '';

  constructor() {
  }

  ngOnInit() {
  }

}
