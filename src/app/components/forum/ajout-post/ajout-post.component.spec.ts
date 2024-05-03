import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPostComponent } from './ajout-post.component';

describe('AjoutPostComponent', () => {
  let component: AjoutPostComponent;
  let fixture: ComponentFixture<AjoutPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
