import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPopularResourcesComponent } from './list-popular-resources.component';

describe('ListPopularResourcesComponent', () => {
  let component: ListPopularResourcesComponent;
  let fixture: ComponentFixture<ListPopularResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPopularResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPopularResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
