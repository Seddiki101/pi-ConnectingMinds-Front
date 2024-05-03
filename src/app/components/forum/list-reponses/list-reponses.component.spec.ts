import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReponsesComponent } from './list-reponses.component';

describe('ListReponsesComponent', () => {
  let component: ListReponsesComponent;
  let fixture: ComponentFixture<ListReponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReponsesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
