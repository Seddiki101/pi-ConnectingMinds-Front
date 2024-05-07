import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllWComponent } from './get-all-w.component';

describe('GetAllWComponent', () => {
  let component: GetAllWComponent;
  let fixture: ComponentFixture<GetAllWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllWComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
