import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DGetByIdWComponent } from './dget-by-id-w.component';

describe('DGetByIdWComponent', () => {
  let component: DGetByIdWComponent;
  let fixture: ComponentFixture<DGetByIdWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DGetByIdWComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DGetByIdWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
