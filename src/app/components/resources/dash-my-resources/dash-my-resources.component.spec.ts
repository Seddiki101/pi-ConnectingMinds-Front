import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMyResourcesComponent } from './dash-my-resources.component';

describe('DashMyResourcesComponent', () => {
  let component: DashMyResourcesComponent;
  let fixture: ComponentFixture<DashMyResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashMyResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashMyResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
