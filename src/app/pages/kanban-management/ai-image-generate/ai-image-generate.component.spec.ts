import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiImageGenerateComponent } from './ai-image-generate.component';

describe('AiImageGenerateComponent', () => {
  let component: AiImageGenerateComponent;
  let fixture: ComponentFixture<AiImageGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiImageGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiImageGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
