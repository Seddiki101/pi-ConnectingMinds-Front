import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlistReservationComponent } from './dlist-reservation.component';

describe('DlistReservationComponent', () => {
  let component: DlistReservationComponent;
  let fixture: ComponentFixture<DlistReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlistReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlistReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
