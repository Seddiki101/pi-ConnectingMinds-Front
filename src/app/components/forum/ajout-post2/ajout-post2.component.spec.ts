import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPost2Component } from './ajout-post2.component';

describe('AjoutPost2Component', () => {
  let component: AjoutPost2Component;
  let fixture: ComponentFixture<AjoutPost2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutPost2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutPost2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
