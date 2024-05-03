import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAnswersComponent } from './dash-answers.component';

describe('DashAnswersComponent', () => {
  let component: DashAnswersComponent;
  let fixture: ComponentFixture<DashAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
