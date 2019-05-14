import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaysquareComponent } from './playsquare.component';

describe('PlaysquareComponent', () => {
  let component: PlaysquareComponent;
  let fixture: ComponentFixture<PlaysquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaysquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaysquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
