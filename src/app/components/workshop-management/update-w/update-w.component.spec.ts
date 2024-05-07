import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWComponent } from './update-w.component';

describe('UpdateWComponent', () => {
  let component: UpdateWComponent;
  let fixture: ComponentFixture<UpdateWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
