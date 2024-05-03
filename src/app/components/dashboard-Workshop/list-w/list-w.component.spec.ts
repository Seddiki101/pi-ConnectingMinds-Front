import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWComponent } from './list-w.component';

describe('ListWComponent', () => {
  let component: ListWComponent;
  let fixture: ComponentFixture<ListWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
