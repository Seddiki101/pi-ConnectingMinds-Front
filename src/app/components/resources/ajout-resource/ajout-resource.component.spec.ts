import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutResourceComponent } from './ajout-resource.component';

describe('AjoutResourceComponent', () => {
  let component: AjoutResourceComponent;
  let fixture: ComponentFixture<AjoutResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
