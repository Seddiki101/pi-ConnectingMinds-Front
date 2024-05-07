import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerMyResourcesComponent } from './banner-my-resources.component';

describe('BannerMyResourcesComponent', () => {
  let component: BannerMyResourcesComponent;
  let fixture: ComponentFixture<BannerMyResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerMyResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerMyResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
