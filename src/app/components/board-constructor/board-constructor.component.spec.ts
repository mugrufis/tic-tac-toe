import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardConstructorComponent } from './board-constructor.component';

describe('BoardConstructorComponent', () => {
  let component: BoardConstructorComponent;
  let fixture: ComponentFixture<BoardConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
