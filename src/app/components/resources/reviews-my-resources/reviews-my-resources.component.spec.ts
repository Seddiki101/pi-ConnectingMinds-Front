import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsMyResourcesComponent } from './reviews-my-resources.component';

describe('ReviewsMyResourcesComponent', () => {
  let component: ReviewsMyResourcesComponent;
  let fixture: ComponentFixture<ReviewsMyResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsMyResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsMyResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
