import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotResponseComponent } from './chatbot-response.component';

describe('ChatbotResponseComponent', () => {
  let component: ChatbotResponseComponent;
  let fixture: ComponentFixture<ChatbotResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
