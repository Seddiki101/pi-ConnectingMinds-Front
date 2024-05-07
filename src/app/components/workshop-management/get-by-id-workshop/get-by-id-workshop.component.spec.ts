import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByIdWorkshopComponent } from './get-by-id-workshop.component';

describe('GetByIdWorkshopComponent', () => {
  let component: GetByIdWorkshopComponent;
  let fixture: ComponentFixture<GetByIdWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetByIdWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetByIdWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
