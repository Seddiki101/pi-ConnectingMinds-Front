import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecherchePComponent } from './recherche-p.component';

describe('RecherchePComponent', () => {
  let component: RecherchePComponent;
  let fixture: ComponentFixture<RecherchePComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecherchePComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecherchePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
