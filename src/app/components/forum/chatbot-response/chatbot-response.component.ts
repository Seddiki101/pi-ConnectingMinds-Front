import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chatbot-response',
  templateUrl: './chatbot-response.component.html',
  styleUrls: ['./chatbot-response.component.css']
})
export class ChatbotResponseComponent {
  @Input() botResponse: string;
}
