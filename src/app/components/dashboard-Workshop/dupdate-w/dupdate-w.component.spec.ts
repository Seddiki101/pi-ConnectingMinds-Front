import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DUpdateWComponent } from './dupdate-w.component';

describe('DUpdateWComponent', () => {
  let component: DUpdateWComponent;
  let fixture: ComponentFixture<DUpdateWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DUpdateWComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DUpdateWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
