import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMyResourcesComponent } from './nav-my-resources.component';

describe('NavMyResourcesComponent', () => {
  let component: NavMyResourcesComponent;
  let fixture: ComponentFixture<NavMyResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavMyResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMyResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
