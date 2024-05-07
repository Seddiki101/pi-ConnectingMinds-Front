import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutWComponent } from './ajout-w.component';

describe('AjoutWComponent', () => {
  let component: AjoutWComponent;
  let fixture: ComponentFixture<AjoutWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutWComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
