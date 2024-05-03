import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAjoutWComponent } from './dajout-w.component';

describe('DAjoutWComponent', () => {
  let component: DAjoutWComponent;
  let fixture: ComponentFixture<DAjoutWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAjoutWComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DAjoutWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
